import numpy as np, sys
from PIL import Image, ImageFilter, ImageFont, ImageDraw
SRC='/home/claude/remix-of-sister-golf-refresh/wp-content/uploads/2023/10/Randall-L.-Woodfin-Banner.png'
src=Image.open(SRC); A=np.asarray(src.convert('RGB')).astype(float)
def dil(m,r): return np.asarray(Image.fromarray((m*255).astype(np.uint8)).filter(ImageFilter.MaxFilter(2*r+1)))>0
def shift(m,dx,dy):
  o=np.zeros_like(m)
  ys=slice(max(dy,0),m.shape[0]+min(dy,0)); yd=slice(max(-dy,0),m.shape[0]+min(-dy,0))
  xs=slice(max(dx,0),m.shape[1]+min(dx,0)); xd=slice(max(-dx,0),m.shape[1]+min(-dx,0))
  o[ys,xs]=m[yd,xd]; return o
EDX,EDY,EOP,EC=-4,1,0.55,160
face_all=np.clip((A.min(2)-200)/55,0,1)
def glyph_alpha(F,wt,ch,sx,capH_px=43):
  S=4; f=ImageFont.truetype(F,100*S)
  if wt:
    ax=f.get_variation_axes(); f.set_variation_by_axes([wt if b'eight' in a_['name'] else a_['default'] for a_ in ax])
  capH=-f.getbbox('N',anchor='ls')[1]; bb=f.getbbox(ch,anchor='ls')
  c=Image.new('L',(bb[2]-bb[0]+8*S,capH+8*S),0); ImageDraw.Draw(c).text((4*S-bb[0],4*S+capH),ch,font=f,fill=255,anchor='ls')
  sc=capH_px/capH; w=round(c.width*sc*sx); h=round(c.height*sc)
  g=np.asarray(c.resize((w,h),Image.LANCZOS))/255.
  cols=np.where(g.max(0)>0.3)[0]; g=g[:,cols[0]:cols[-1]+1]
  top=round(4*S*sc); return g[top:top+capH_px+1]
def build(five):
  out=A.copy()
  # 1) clear old 2ND (+echo) using foliage from 60 rows above
  oldface=face_all[205:262,322:452]>0.3
  rm=np.zeros(A.shape[:2],bool); rm[205:262,322:452]=dil(oldface,6)
  feather=np.asarray(Image.fromarray((rm*255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(2)))/255.
  sh=62
  patch=np.roll(A,sh,axis=0)
  fm=np.maximum(feather,rm)[...,None]
  out=out*(1-fm)+patch*fm
  # 2) new face alpha layer
  L=np.zeros(A.shape[:2])
  H=face_all[211:254,770:802].copy(); T=face_all[211:254,910:941].copy()
  # H right edge at 443, T right at 402 -> gaps of 9-10 like original
  L[211:254,412:444]=np.maximum(L[211:254,412:444],H)
  L[211:254,372:403]=np.maximum(L[211:254,372:403],T)
  g=five; w=g.shape[1]; x0=362-w+1
  L[211:211+g.shape[0],x0:x0+w]=np.maximum(L[211:211+g.shape[0],x0:x0+w],g[:min(g.shape[0],43+1)][:L[211:211+g.shape[0]].shape[0]])
  S=shift(L,EDX,EDY)*EOP
  reg=(slice(200,268),slice(315,460))
  o=out[reg]; s=S[reg][...,None]; l=L[reg][...,None]
  o=o*(1-s)+EC*s; o=o*(1-l)+255*l; out[reg]=o
  return out,x0
if __name__=='__main__':
  fonts=[('GI','/tmp/claude-0/fonts/gi/package/files/glacial-indifference-700.ttf',None,0.95),('Figtree','/tmp/claude-0/fonts/Figtree.ttf',700,0.9),('Manrope','/tmp/claude-0/fonts/Manrope.ttf',800,0.9),('Sora','/tmp/claude-0/fonts/Sora.ttf',600,0.9),('Montserrat','/tmp/claude-0/fonts/Montserrat.ttf',650,0.85),('Kumbh','/tmp/claude-0/fonts/KumbhSans.ttf',650,0.85)]
  rows=[src.convert('RGB').crop((300,195,720,268))]
  for nm,F,wt,sx in fonts:
    g=glyph_alpha(F,wt,'5',sx); out,x0=build(g)
    im=Image.fromarray(np.clip(out,0,255).round().astype(np.uint8)).crop((300,195,720,268))
    ImageDraw.Draw(im).text((370,2),nm,fill='yellow'); rows.append(im); print(nm,g.shape,x0)
  P=Image.new('RGB',(420,73*len(rows)))
  for i,r in enumerate(rows): P.paste(r,(0,73*i))
  P.resize((840,146*len(rows)),Image.LANCZOS).save('five.png')

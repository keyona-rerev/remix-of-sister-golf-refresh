import numpy as np
from PIL import Image, ImageFont, ImageDraw, ImageFilter
SRC='/home/claude/remix-of-sister-golf-refresh/wp-content/uploads/2023/10/Randall-L.-Woodfin-Banner.png'
CUR='/home/claude/remix-of-sister-golf-refresh/wp-content/uploads/woodfin-golf-2026/banner/Randall-L.-Woodfin-Banner-2026.png'
orig=np.asarray(Image.open(SRC).convert('RGB')).astype(float)
cur=Image.open(CUR); alpha=cur.getchannel('A') if cur.mode=='RGBA' else None
out=np.asarray(cur.convert('RGB')).astype(float).copy()
H,Wd=out.shape[:2]
# 1) headline from the 5TH composite
head=np.load('head_out.npy'); out[195:270,300:470]=head[195:270,300:470]
# 2) date: 23rd, -> 26th,
f=ImageFont.truetype('/tmp/claude-0/fonts/Montserrat.ttf',39.5); f.set_variation_by_axes([675])
def glyph(s,x,y):
  c=Image.new('L',(Wd,H),0); ImageDraw.Draw(c).text((x,y),s,font=f,fill=255,anchor='ls'); return c
def shadow(g,dx=3,dy=1,blur=1,k=0.45):
  s=Image.new('L',g.size,0); s.paste(g,(dx,dy)); s=s.filter(ImageFilter.GaussianBlur(blur)); return np.asarray(s)/255.*k
def dil(m,r): return np.asarray(Image.fromarray((m*255).astype(np.uint8)).filter(ImageFilter.MaxFilter(2*r+1)))>0
Wm=np.clip((orig.min(2)-120)/110,0,1)*((orig.max(2)-orig.min(2))<60)
best=None
for x in range(893,905):
  for y in (425,426,427):
    g=np.asarray(glyph('3rd,',x,y))/255.
    e=((g-Wm)[390:440,890:980]**2).sum()
    if best is None or e<best[0]: best=(e,x,y)
_,x3,y3=best; print('3rd, origin',x3,y3,best[0])
best2=None
for x in range(868,882):
  g=np.asarray(glyph('2',x,y3))/255.; e=((g-Wm)[390:432,866:898]**2).sum()
  if best2 is None or e<best2[0]: best2=(e,x)
x2=best2[1]; print('2 origin',x2)
gold=glyph('3rd,',x3,y3); ga=np.asarray(gold)/255.
remove=dil((ga>0.02)|(shadow(gold,k=1)>0.05),2)
g2=glyph('2',x2,y3); g2a=np.asarray(g2)/255.
protect=dil((g2a>0.02)|(shadow(g2,k=1)>0.15),1) & ~dil(ga>0.15,1)
remove&=~protect
# inpaint: smooth diffusion + texture from 45 rows below
ys,xs=np.where(remove); y_a,y_b,x_a,x_b=ys.min()-8,ys.max()+9,xs.min()-8,xs.max()+9
R=out[y_a:y_b,x_a:x_b].copy(); m=remove[y_a:y_b,x_a:x_b]
D=R.copy(); D[m]=R[~m].mean(0)
for _ in range(1500):
  avg=(np.roll(D,1,0)+np.roll(D,-1,0)+np.roll(D,1,1)+np.roll(D,-1,1))/4; D[m]=avg[m]
P=out[y_a+48:y_b+48,x_a:x_b]
Pb=np.asarray(Image.fromarray(np.clip(P,0,255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(4))).astype(float)
fill=D+(P-Pb)
fe=np.asarray(Image.fromarray((m*255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(1.2)))/255.
fe=np.maximum(fe,m)[...,None]
R=R*(1-fe)+fill*fe
out[y_a:y_b,x_a:x_b]=R
print('region',x_a,x_b,y_a,y_b)
gnew=glyph('6th,',x3,y3); gn=np.asarray(gnew)/255.
sa=shadow(gnew)[...,None]; out=out*(1-sa); out=out*(1-gn[...,None])+255*gn[...,None]
res=Image.fromarray(np.clip(out,0,255).round().astype(np.uint8),'RGB')
if alpha is not None: res.putalpha(alpha)
res.save('banner-2026.png',optimize=True)
o=Image.open(SRC).convert('RGB'); r=res.convert('RGB')
P=Image.new('RGB',(1500,600))
P.paste(o.crop((250,100,1750,400)),(0,0)); P.paste(r.crop((250,100,1750,400)),(0,300))
P.save('full_cmp.png')
Q=Image.new('RGB',(420,120)); Q.paste(o.crop((690,385,1110,445)),(0,0)); Q.paste(r.crop((690,385,1110,445)),(0,60)); Q.resize((1260,360),Image.LANCZOS).save('date_cmp.png')

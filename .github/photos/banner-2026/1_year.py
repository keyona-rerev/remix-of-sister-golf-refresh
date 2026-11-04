"""One-off: copy the 2023 Woodfin banner and change only the year to 2026.

Fits Montserrat (weight 675, 39.5 px) to the old digits, swaps the final "3"
for a "6" with the same drop shadow, and leaves every other pixel alone.
Needs the Montserrat variable font at /tmp/claude-0/fonts/Montserrat.ttf.
"""
import numpy as np
from PIL import Image, ImageFont, ImageDraw, ImageFilter
SRC='/home/claude/remix-of-sister-golf-refresh/wp-content/uploads/2023/10/Randall-L.-Woodfin-Banner.png'
src=Image.open(SRC); alpha_ch=src.getchannel('A') if src.mode=='RGBA' else None
im=np.asarray(src.convert('RGB')).astype(float)
H,W_=im.shape[:2]
F='/tmp/claude-0/fonts/Montserrat.ttf'
f=ImageFont.truetype(F,39.5); f.set_variation_by_axes([675])
def glyph(ch,x,y):
    c=Image.new('L',(W_,H),0); ImageDraw.Draw(c).text((x,y),ch,font=f,fill=255,anchor='ls'); return c
def shadow_alpha(g,dx,dy,blur,k):
    s=Image.new('L',g.size,0); s.paste(g,(dx,dy)); s=s.filter(ImageFilter.GaussianBlur(blur))
    return np.asarray(s)/255.*k
def diffuse_fill(img,mask,iters=400):
    out=img.copy(); m=mask
    out[m]=img[~m].mean(0)
    for _ in range(iters):
        avg=(np.roll(out,1,0)+np.roll(out,-1,0)+np.roll(out,1,1)+np.roll(out,-1,1))/4
        out[m]=avg[m]
    return out
def dilate(mask,r):
    m=Image.fromarray((mask*255).astype(np.uint8)).filter(ImageFilter.MaxFilter(2*r+1)); return np.asarray(m)>0
# --- fit shadow on the "0" (find its origin by fitting quickly)
mnc=im.min(2); W=np.clip((mnc-120)/110,0,1)*((im.max(2)-mnc)<60)
best=None
for x in range(1008,1020):
  for y in (425,426,427):
    g=np.asarray(glyph('0',x,y))/255.
    e=((g-W)[390:432,1005:1040]**2).sum()
    if best is None or e<best[0]: best=(e,x,y)
_,x0,y0=best; print('0 origin',x0,y0)
g0=glyph('0',x0,y0); g0a=np.asarray(g0)/255.
box=(slice(385,440),slice(1000,1045))
reg=dilate(g0a>0.02,6)
bg=im.copy(); sub=bg[box].copy(); sub=diffuse_fill(sub,reg[box]); bg[box]=sub
fit=None
for dx in range(0,5):
  for dy in range(0,5):
    for blur in (1,1.5,2,3,4,5):
      for k in (0.3,0.45,0.6,0.75,0.9):
        sa=shadow_alpha(g0,dx,dy,blur,k)[box][...,None]
        comp=bg[box]*(1-sa)
        comp=comp*(1-g0a[box][...,None])+255*g0a[box][...,None]
        e=((comp-im[box])**2).sum()
        if fit is None or e<fit[0]: fit=(e,dx,dy,blur,k)
print('shadow',fit)
_,sdx,sdy,sblur,sk=fit
# --- remove the "3": replace with grass copied from just right of the year
g3=glyph('3',1063,426); g3a=np.asarray(g3)/255.
remove=dilate((g3a>0.02)|(shadow_alpha(g3,sdx,sdy,sblur,1)>0.05),2)
best2=None
for x in range(1034,1048):
    g=np.asarray(glyph('2',x,426))/255.
    e=((g-W)[392:432,1032:1062]**2).sum()
    if best2 is None or e<best2[0]: best2=(e,x)
print('second 2 origin',best2[1])
g2=glyph('2',best2[1],426); g2a=np.asarray(g2)/255.
protect=dilate((g2a>0.02)|(shadow_alpha(g2,sdx,sdy,sblur,1)>0.15),1) & ~dilate(g3a>0.15,1)
ys,xs=np.where(remove); y_a,y_b,x_a,x_b=ys.min(),ys.max()+1,xs.min(),xs.max()+1
print('remove box',x_a,x_b,y_a,y_b)
shift=x_b-x_a+4
out=im.copy()
patch=im[y_a-6:y_b+6, x_a+shift-6:x_b+shift+6]
feather=np.asarray(Image.fromarray((remove*255).astype(np.uint8)).filter(ImageFilter.MaxFilter(5)).filter(ImageFilter.GaussianBlur(2)))/255.
region=out[y_a-6:y_b+6, x_a-6:x_b+6]
fm=(feather*(~protect))[y_a-6:y_b+6, x_a-6:x_b+6][...,None]
out[y_a-6:y_b+6, x_a-6:x_b+6]=region*(1-fm)+patch*fm
# --- draw the "6" with the same font, place and shadow
g6=glyph('6',1063,426); g6a=np.asarray(g6)/255.
sa=shadow_alpha(g6,sdx,sdy,sblur,sk)[...,None]
out=out*(1-sa); out=out*(1-g6a[...,None])+255*g6a[...,None]
res=Image.fromarray(np.clip(out,0,255).round().astype(np.uint8),'RGB')
if alpha_ch is not None: res.putalpha(alpha_ch)
res.save('/tmp/claude-0/bn/banner-2026.png',optimize=True)
cmp=Image.new('RGB',(470*2,140)); cmp.paste(src.convert('RGB').crop((660,320,1130,460)),(0,0)); cmp.paste(res.convert('RGB').crop((660,320,1130,460)),(470,0))
cmp.resize((940*2,280)).save('/tmp/claude-0/bn/compare.png')

import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/membership-preview")({
  head: () => ({
    meta: [
      { title: "Membership Portal Preview — SisterGolf" },
      { name: "robots", content: "noindex, nofollow" },
      {
        name: "description",
        content:
          "Internal preview of the SisterGolf membership portal experience. Not a live member login.",
      },
    ],
  }),
  component: MembershipPreview,
});

/* ------------------------------------------------------------------
   Replica of the current ClientClub membership portal.
   Built for founder review before the real portal is rebuilt in-house.
   Styles are namespaced under .sgp so they cannot touch site Tailwind.
------------------------------------------------------------------- */

const CSS = `
.sgp{--pink:#EF67A5;--pink-mid:#F186B5;--pink-soft:#FCE4EF;--pink-bg:#FDF2F7;--ink:#1A1A1A;
 --muted:#6B7280;--line:#EAEAEC;--canvas:#FAFAFA;--rail:#F7F7F8;--r:12px;
 font-family:Inter,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:var(--ink)}
.sgp *{box-sizing:border-box;margin:0;padding:0}
.sgp button{font-family:inherit}
.sgp .app{display:flex;height:calc(100vh - 90px);min-height:640px;overflow:hidden;position:relative;
 background:var(--canvas);border:1px solid var(--line)}
.sgp .rail{width:68px;flex-shrink:0;background:var(--rail);border-right:1px solid var(--line);
 display:flex;flex-direction:column;align-items:center;padding:14px 0;gap:14px}
.sgp .rail-btn{width:40px;height:40px;border-radius:10px;display:grid;place-items:center;
 background:transparent;border:none;cursor:pointer;color:#5A5A63}
.sgp .rail-btn.active{background:var(--pink-soft);color:var(--pink)}
.sgp .sidebar{width:252px;flex-shrink:0;background:var(--pink-bg);border-right:1px solid var(--line);
 display:flex;flex-direction:column;overflow-y:auto}
.sgp .channels{padding:14px 12px 6px;display:flex;flex-direction:column;gap:2px}
.sgp .channel{display:flex;align-items:center;gap:11px;padding:11px 13px;border-radius:9px;font-size:14px;
 color:#3F3F46;font-weight:500;border:none;background:transparent;cursor:pointer;width:100%;text-align:left}
.sgp .channel:hover{background:#F8DCE9}
.sgp .channel.active{background:var(--pink-mid);color:#fff}
.sgp .channel.active svg{color:#fff}
.sgp .channel svg{color:#52525B;flex-shrink:0}
.sgp .cdiv{height:1px;background:#F2D9E6;margin:8px 14px}
.sgp .side-btn{margin:auto 16px 20px;padding:14px;border-radius:10px;background:var(--pink-mid);color:#fff;
 font-size:13.5px;font-weight:600;text-align:center;border:none;cursor:pointer}
.sgp .swag{padding:20px 18px}
.sgp .swag h3{font-size:16px;font-weight:700}
.sgp .swag p{font-size:13.5px;color:#3F3F46;margin-top:6px;line-height:1.5}
.sgp .main{flex:1;display:flex;flex-direction:column;min-width:0}
.sgp .topbar{height:62px;flex-shrink:0;background:var(--pink-bg);border-bottom:1px solid var(--line);
 display:flex;align-items:center;padding:0 20px;gap:18px}
.sgp .ws{display:flex;align-items:center;gap:10px;width:250px;margin-left:-20px;padding-left:14px}
.sgp .ws-icon{width:30px;height:30px;border-radius:8px;background:#CFE9F7;display:grid;place-items:center;
 flex-shrink:0;color:#3D7EA6}
.sgp .ws-name{font-size:14.5px;font-weight:600;white-space:nowrap}
.sgp .search{flex:1;max-width:620px;margin:0 auto;background:#FBD9E7;border-radius:999px;display:flex;
 align-items:center;gap:10px;padding:10px 18px;color:#B4708D}
.sgp .search input{border:none;background:transparent;outline:none;font-family:inherit;font-size:14px;
 color:var(--ink);width:100%}
.sgp .top-actions{display:flex;align-items:center;gap:16px;color:#5A5A63}
.sgp .top-actions button{background:none;border:none;cursor:pointer;color:inherit;display:grid;place-items:center}
.sgp .avatar{width:34px;height:34px;border-radius:50%;background:#C9A88A;flex-shrink:0;display:grid;
 place-items:center;font-size:12px;font-weight:600;color:#fff;overflow:hidden}
.sgp .tabbar{background:#fff;border-bottom:1px solid var(--line);padding:0 26px;display:flex;
 align-items:center;gap:30px;flex-shrink:0}
.sgp .tab{padding:17px 2px;font-size:14.5px;color:var(--muted);font-weight:500;border:none;
 border-bottom:2.5px solid transparent;background:none;cursor:pointer}
.sgp .tab.active{color:var(--ink);border-bottom-color:var(--ink);font-weight:600}
.sgp .chat-btn{margin-left:auto;background:var(--pink-mid);color:#fff;border:none;border-radius:8px;
 padding:9px 20px;font-size:13.5px;font-weight:600;cursor:pointer}
.sgp .content{flex:1;overflow-y:auto;padding:22px 26px 40px}
.sgp .grid{display:grid;grid-template-columns:minmax(0,1fr) 330px;gap:22px;align-items:start;max-width:1260px}
.sgp .grid.full{grid-template-columns:minmax(0,1fr)}
.sgp .composer{background:#fff;border:1px solid var(--line);border-radius:var(--r);padding:14px 18px;
 display:flex;align-items:center;gap:14px;margin-bottom:18px}
.sgp .composer input{flex:1;color:#9CA3AF;font-size:15.5px;border:none;font-family:inherit;outline:none}
.sgp .go-live{display:flex;align-items:center;gap:8px;background:#fff;border:1px solid var(--line);
 border-radius:9px;padding:9px 16px;font-size:14px;font-weight:600;cursor:pointer;flex-shrink:0}
.sgp .live-dot{width:22px;height:16px;border-radius:4px;background:#E5342B;display:grid;place-items:center}
.sgp .featured{background:#fff;border:1px solid var(--line);border-radius:var(--r);padding:16px 20px 20px;margin-bottom:16px}
.sgp .fh{display:flex;align-items:center;gap:8px}
.sgp .fh h3{font-size:17px;font-weight:700}
.sgp .ftog{margin-left:auto;color:#6B7280;background:none;border:none;cursor:pointer;display:grid;place-items:center}
.sgp .ftog.col{transform:rotate(180deg)}
.sgp .ftrack{position:relative;display:flex;justify-content:center;margin-top:14px}
.sgp .fcard{border:1px solid var(--line);border-radius:10px;overflow:hidden;width:390px;max-width:100%}
.sgp .fcard .fchead{display:flex;align-items:flex-start;gap:11px;padding:14px 16px 0}
.sgp .fcard h4{font-size:19px;font-weight:700;padding:12px 16px 14px}
.sgp .fmedia{height:200px;background:linear-gradient(160deg,#5B7B4F,#2E3D2B)}
.sgp .fcard .pacts{padding:12px 16px;margin:0;border-top:1px solid var(--line)}
.sgp .cbtn{position:absolute;top:50%;transform:translateY(-50%);width:40px;height:40px;border-radius:50%;
 background:#fff;border:1px solid var(--line);display:grid;place-items:center;cursor:pointer;color:#6B7280}
.sgp .cbtn.prev{left:0}.sgp .cbtn.next{right:0}
.sgp .post{background:#fff;border:1px solid var(--line);border-radius:var(--r);padding:18px 20px;margin-bottom:16px}
.sgp .phead{display:flex;align-items:flex-start;gap:11px;margin-bottom:13px}
.sgp .pav{position:relative;flex-shrink:0}
.sgp .pav .lvl{position:absolute;bottom:-3px;left:-3px;width:17px;height:17px;border-radius:50%;
 background:var(--pink);color:#fff;font-size:9.5px;font-weight:700;display:grid;place-items:center;border:2px solid #fff}
.sgp .pauth{font-size:14.5px;font-weight:600;line-height:1.3}
.sgp .pmeta{font-size:12.5px;color:var(--muted);margin-top:2px}
.sgp .pmeta span.ch{color:var(--pink);font-weight:500}
.sgp .pmenu{margin-left:auto;color:#9CA3AF;background:none;border:none;cursor:pointer;font-size:18px;padding:0 4px}
.sgp .pbody{display:flex;gap:18px;align-items:flex-start}
.sgp .ptext{flex:1;min-width:0}
.sgp .ptitle{font-size:17.5px;font-weight:700;margin-bottom:7px;line-height:1.3;white-space:nowrap;
 overflow:hidden;text-overflow:ellipsis}
.sgp .pexc{font-size:14.5px;color:#3F3F46;line-height:1.55;display:-webkit-box;-webkit-line-clamp:2;
 -webkit-box-orient:vertical;overflow:hidden}
.sgp .pexc a{color:#2C6ECB;text-decoration:none}
.sgp .pthumb{width:132px;height:96px;border-radius:9px;flex-shrink:0;background:linear-gradient(160deg,#5B7B4F,#2E3D2B)}
.sgp .pacts{display:flex;align-items:center;gap:22px;margin-top:15px;color:var(--muted);font-size:13.5px}
.sgp .pact{display:flex;align-items:center;gap:7px;background:none;border:none;cursor:pointer;color:inherit;font-size:inherit}
.sgp .pact.on{color:var(--pink);font-weight:600}
.sgp .card{background:#fff;border:1px solid var(--line);border-radius:var(--r);overflow:hidden;margin-bottom:18px}
.sgp .cover{width:100%;height:150px;background:linear-gradient(150deg,#8FC45C,#4E7A32);position:relative}
.sgp .cover::after{content:"";position:absolute;right:26px;top:50%;transform:translateY(-50%);width:74px;
 height:74px;border-radius:50%;background:#fff;box-shadow:0 2px 8px rgba(0,0,0,.18)}
.sgp .gbody{padding:18px}
.sgp .gname{font-size:17.5px;font-weight:700}
.sgp .gpriv{display:flex;align-items:center;gap:6px;font-size:13px;color:var(--muted);margin-top:5px}
.sgp .gdesc{font-size:14px;color:#3F3F46;line-height:1.55;margin-top:12px}
.sgp .gstats{display:grid;grid-template-columns:repeat(3,1fr);margin:20px 0 16px;text-align:center;
 border-top:1px solid var(--line);border-bottom:1px solid var(--line);padding:14px 0}
.sgp .gstats>div+div{border-left:1px solid var(--line)}
.sgp .snum{font-size:22px;font-weight:700}
.sgp .slab{font-size:12.5px;color:var(--muted);margin-top:2px}
.sgp .mavs{display:flex;margin-bottom:18px}
.sgp .mavs>*{width:31px;height:31px;border-radius:50%;border:2px solid #fff;margin-right:-8px;
 background:#B9A08C;display:grid;place-items:center;font-size:11px;font-weight:600;color:#fff;flex-shrink:0}
.sgp .b-out{width:100%;padding:12px;border:1px solid var(--line);border-radius:9px;background:#fff;
 font-size:13px;font-weight:600;letter-spacing:.06em;color:#3F3F46;cursor:pointer;margin-bottom:10px}
.sgp .b-pink{width:100%;padding:13px;border:none;border-radius:9px;background:var(--pink-mid);color:#fff;
 font-size:13px;font-weight:600;letter-spacing:.06em;cursor:pointer}
.sgp .lbh{padding:18px 20px 4px;font-size:16px;font-weight:700}
.sgp .lbrow{display:flex;align-items:center;gap:12px;padding:13px 20px}
.sgp .rank{width:26px;height:26px;border-radius:50%;display:grid;place-items:center;font-size:12px;
 font-weight:700;color:#fff;flex-shrink:0;background:#D4D4D8}
.sgp .rank.r1{background:#E8B84B}.sgp .rank.r2{background:#B6B6BD}.sgp .rank.r3{background:#E08A5E}
.sgp .rank.pl{background:#F2F2F4;color:#6B7280}
.sgp .lbname{font-size:14.5px;font-weight:500;flex:1;min-width:0}
.sgp .lbpts{font-size:14px;color:#3F3F46;font-weight:500}
.sgp .lbsee{display:block;width:100%;text-align:center;padding:16px;color:#2C6ECB;font-size:14px;
 background:none;border:none;border-top:1px solid var(--line);cursor:pointer}
.sgp .pcard{background:#fff;border:1px solid var(--line);border-radius:var(--r);padding:32px 30px;
 display:grid;grid-template-columns:300px 1fr 1fr;gap:30px;align-items:start}
.sgp .ring{width:172px;height:172px;border-radius:50%;border:5px solid #E8E8EC;margin:0 auto;
 position:relative;background:#C9A88A}
.sgp .ring .tick{position:absolute;top:-5px;left:50%;transform:translateX(-50%);width:16px;height:6px;
 border-radius:3px;background:var(--pink)}
.sgp .ring .bdg{position:absolute;bottom:6px;right:6px;width:34px;height:34px;border-radius:50%;
 background:var(--pink);color:#fff;display:grid;place-items:center;font-weight:700;font-size:15px;border:3px solid #fff}
.sgp .pme{text-align:center}
.sgp .pname{font-size:25px;font-weight:700;margin-top:16px}
.sgp .plvl{font-size:15px;color:#3F3F46;margin-top:8px}
.sgp .pnext{font-size:14px;color:#3F3F46;margin-top:5px;display:flex;align-items:center;justify-content:center;gap:6px}
.sgp .lrow{display:flex;align-items:center;gap:14px;margin-bottom:20px}
.sgp .lic{width:44px;height:44px;border-radius:50%;background:#F2F2F4;display:grid;place-items:center;
 color:#9CA3AF;flex-shrink:0}
.sgp .lic.cur{background:#1A1A1A;color:#fff;font-weight:700;font-size:16px}
.sgp .lname{font-size:15.5px;font-weight:600}
.sgp .lpct{font-size:14px;color:var(--muted);margin-top:2px}
.sgp .lupd{font-size:13.5px;color:var(--muted);font-style:italic;margin:18px 0 16px}
.sgp .lcols{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;align-items:start}
.sgp .filters{display:flex;align-items:center;gap:10px;margin-bottom:18px;flex-wrap:wrap}
.sgp .pill{display:flex;align-items:center;gap:9px;padding:10px 18px;border-radius:9px;
 border:1px solid var(--line);background:#fff;font-size:14px;font-weight:500;cursor:pointer;color:#3F3F46}
.sgp .pill.active{background:var(--pink-mid);color:#fff;border-color:var(--pink-mid)}
.sgp .msearch{flex:1;min-width:200px;max-width:280px;display:flex;align-items:center;gap:9px;
 padding:10px 16px;border:1px solid var(--line);border-radius:9px;background:#fff;color:#9CA3AF}
.sgp .msearch input{border:none;outline:none;font-family:inherit;font-size:14px;width:100%}
.sgp .mlist{background:#fff;border:1px solid var(--line);border-radius:var(--r)}
.sgp .mem{display:flex;gap:14px;padding:20px;border-bottom:1px solid var(--line)}
.sgp .mem:last-child{border-bottom:none}
.sgp .memav{position:relative;flex-shrink:0}
.sgp .memav .avatar{width:44px;height:44px;font-size:15px}
.sgp .memav .lvl{position:absolute;bottom:-2px;right:-2px;width:17px;height:17px;border-radius:50%;
 background:var(--pink);color:#fff;font-size:9.5px;font-weight:700;display:grid;place-items:center;border:2px solid #fff}
.sgp .memname{font-size:15.5px;font-weight:600}
.sgp .memh{font-size:13.5px;color:var(--muted);margin-top:2px}
.sgp .membio{font-size:14px;color:#3F3F46;line-height:1.55;margin-top:10px}
.sgp .memmeta{display:flex;align-items:center;gap:9px;font-size:14px;color:#3F3F46;margin-top:9px}
.sgp .memmeta svg{color:#9CA3AF;flex-shrink:0}
.sgp .memmenu{margin-left:auto;color:#9CA3AF;background:none;border:none;cursor:pointer;font-size:17px;
 align-self:flex-start;padding:0 4px}
.sgp .empty{display:grid;place-items:center;padding:90px 20px;text-align:center;gap:6px}
.sgp .empty h3{font-size:17px;font-weight:700;margin-top:14px}
.sgp .empty p{font-size:14px;color:var(--muted);line-height:1.55;max-width:320px}
.sgp .scrim{position:absolute;inset:0;background:rgba(28,28,33,.42);z-index:40}
.sgp .modal{position:absolute;z-index:50;top:50%;left:50%;transform:translate(-50%,-50%);background:#fff;
 border-radius:14px;box-shadow:0 18px 50px rgba(0,0,0,.22);width:min(720px,92%);max-height:88%;
 display:flex;flex-direction:column;overflow:hidden}
.sgp .modal.wide{width:min(1000px,94%);height:88%}
.sgp .mhead{padding:26px 28px 18px;display:flex;align-items:flex-start;gap:14px}
.sgp .mhead h2{font-size:21px;font-weight:700}
.sgp .mhead p{font-size:14.5px;color:#3F3F46;line-height:1.55;margin-top:6px}
.sgp .mx{margin-left:auto;background:none;border:none;cursor:pointer;color:#6B7280;flex-shrink:0}
.sgp .mbody{padding:0 28px 24px;overflow-y:auto}
.sgp .field{margin-bottom:20px}
.sgp .field label{display:block;font-size:14.5px;font-weight:600;margin-bottom:9px}
.sgp .req{color:#E5342B;margin-left:3px}
.sgp .inp{display:flex;align-items:center;gap:11px;border:1px solid #DCDCE0;border-radius:9px;
 padding:13px 15px;color:#9CA3AF;background:#fff}
.sgp .inp input,.sgp .inp textarea{border:none;outline:none;font-family:inherit;font-size:14.5px;
 width:100%;resize:none;color:var(--ink)}
.sgp .cnt{margin-left:auto;font-size:13px;color:#9CA3AF;flex-shrink:0}
.sgp .trow{display:flex;align-items:flex-start;gap:16px;padding:16px 0}
.sgp .trow h4{font-size:15px;font-weight:600}
.sgp .trow p{font-size:13.5px;color:var(--muted);line-height:1.5;margin-top:4px}
.sgp .tg{width:44px;height:24px;border-radius:999px;background:#D4D4D8;flex-shrink:0;margin-left:auto;
 position:relative;border:none;cursor:pointer}
.sgp .tg::after{content:"";position:absolute;top:3px;left:3px;width:18px;height:18px;border-radius:50%;
 background:#fff;transition:left .15s}
.sgp .tg.on{background:var(--pink-mid)}
.sgp .tg.on::after{left:23px}
.sgp .swrap{display:grid;grid-template-columns:240px 1fr;flex:1;min-height:0}
.sgp .snav-wrap{border-right:1px solid var(--line);overflow-y:auto;padding:12px}
.sgp .snav{display:block;width:100%;text-align:left;padding:13px 16px;border-radius:9px;border:none;
 background:none;font-size:14.5px;color:#3F3F46;cursor:pointer;font-weight:500}
.sgp .snav.active{background:#F0F0F2;font-weight:600}
.sgp .sbody{overflow-y:auto;padding:28px 30px}
.sgp .sbody h3{font-size:20px;font-weight:700}
.sgp .sbody .sub{font-size:14px;color:var(--muted);margin-top:5px;padding-bottom:16px;
 border-bottom:1px solid var(--line);margin-bottom:22px}
.sgp .urow{display:flex}
.sgp .urow .base{flex:1;border:1px solid #DCDCE0;border-right:none;border-radius:9px 0 0 9px;
 padding:13px 15px;font-size:14.5px;color:#3F3F46;overflow:hidden;white-space:nowrap}
.sgp .urow .slug{display:flex;align-items:center;gap:12px;border:1px solid #DCDCE0;
 border-radius:0 9px 9px 0;padding:13px 15px;font-size:14.5px}
.sgp .ogrid{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:24px}
.sgp .opt{border:1px solid #DCDCE0;border-radius:10px;padding:18px;display:flex;gap:12px;
 align-items:flex-start;cursor:pointer;background:#fff;text-align:left}
.sgp .opt.sel{border-color:#2C6ECB;border-width:1.5px}
.sgp .opt h4{font-size:15px;font-weight:600}
.sgp .opt p{font-size:13.5px;color:#3F3F46;line-height:1.5;margin-top:5px}
.sgp .radio{width:18px;height:18px;border-radius:50%;border:2px solid #9CA3AF;flex-shrink:0;margin-top:2px}
.sgp .radio.on{border-color:#2C6ECB;box-shadow:inset 0 0 0 3.5px #fff,inset 0 0 0 9px #2C6ECB}
.sgp .chk{width:18px;height:18px;border-radius:4px;border:2px solid #9CA3AF;flex-shrink:0;margin-top:2px}
.sgp .chk.on{background:#2C6ECB;border-color:#2C6ECB;display:grid;place-items:center;color:#fff}
.sgp .mfoot{border-top:1px solid var(--line);padding:18px 28px;display:flex;justify-content:flex-end;
 gap:12px;background:#fff;flex-shrink:0}
.sgp .b-ghost{padding:13px 34px;border:1px solid #DCDCE0;border-radius:9px;background:#fff;
 font-size:14.5px;font-weight:500;cursor:pointer}
.sgp .b-save{padding:13px 44px;border:none;border-radius:9px;background:var(--pink-mid);color:#fff;
 font-size:14.5px;font-weight:600;cursor:pointer}
.sgp .chatp{position:absolute;z-index:50;top:74px;right:22px;width:min(560px,46%);background:#fff;
 border-radius:14px;box-shadow:0 14px 44px rgba(0,0,0,.2);padding:22px 24px 30px}
.sgp .chatp h2{font-size:20px;font-weight:700;margin-bottom:18px}
.sgp .nocap{background:#fff;border:1px dashed #D8D8DE;border-radius:var(--r);padding:60px 30px;text-align:center}
.sgp .nocap h3{font-size:18px;font-weight:700}
.sgp .nocap p{font-size:14.5px;color:var(--muted);line-height:1.6;max-width:400px;margin:10px auto 0}
.sgp .notice{background:#FFF8E6;border:1px solid #F0DFAE;border-radius:10px;padding:14px 18px;
 font-size:14px;color:#6B5A20;line-height:1.55;margin-bottom:18px}
@media (max-width:1180px){.sgp .pcard{grid-template-columns:1fr;gap:24px}.sgp .lcols{grid-template-columns:1fr}}
@media (max-width:1080px){.sgp .grid{grid-template-columns:minmax(0,1fr)}.sgp .sidebar{width:212px}}
@media (max-width:760px){.sgp .rail,.sgp .sidebar{display:none}.sgp .content{padding:16px}
 .sgp .pthumb{width:88px;height:66px}.sgp .ws{display:none}.sgp .ogrid,.sgp .swrap{grid-template-columns:1fr}}
.sgp .login-wrap{min-height:calc(100vh - 90px);display:flex;align-items:flex-start;justify-content:center;padding:70px 20px;background:#fff}
.sgp .login{width:100%;max-width:520px}
.sgp .login h1{font-size:44px;font-weight:600;letter-spacing:-.02em;margin-bottom:38px}
.sgp .goog{width:100%;display:flex;align-items:center;justify-content:center;gap:12px;padding:15px;border:1px solid #DCDCE0;border-radius:8px;background:#fff;font-size:17px;color:#3F3F46;cursor:pointer}
.sgp .goog:hover{background:#FAFAFA}
.sgp .divider{display:flex;align-items:center;gap:14px;margin:26px 0;color:#6B7280;font-size:15px}
.sgp .divider::before,.sgp .divider::after{content:"";flex:1;height:1px;background:var(--line)}
.sgp .lfield{display:flex;align-items:center;gap:14px;border:1px solid #DCDCE0;border-radius:8px;padding:15px 18px;margin-bottom:14px;color:#9CA3AF;background:#fff}
.sgp .lfield input{border:none;outline:none;font-family:inherit;font-size:16.5px;width:100%;color:var(--ink)}
.sgp .forgot{display:block;text-align:right;color:#2C6ECB;font-size:15px;margin:0 0 20px auto;background:none;border:none;cursor:pointer;font-family:inherit}
.sgp .b-login{width:100%;padding:16px;border:none;border-radius:8px;background:#1DA75A;color:#fff;font-size:17px;font-weight:600;cursor:pointer;margin-bottom:14px}
.sgp .b-login:hover{background:#17904D}
.sgp .b-secure{width:100%;padding:15px;border:1px solid #DCDCE0;border-radius:8px;background:#fff;font-size:16px;color:#3F3F46;cursor:pointer;margin-bottom:22px;font-family:inherit}
.sgp .newuser{text-align:center;font-size:16px;color:#3F3F46}
.sgp .newuser button{background:none;border:none;color:#2C6ECB;font-size:16px;cursor:pointer;font-family:inherit}
.sgp .hub{display:flex;min-height:calc(100vh - 90px);background:#fff;border:1px solid var(--line)}
.sgp .hub-side{width:372px;flex-shrink:0;border-right:1px solid var(--line);padding:40px 30px}
.sgp .hub-logo{width:134px;height:134px;border-radius:50%;background:#EDE7FA;margin:0 auto;display:grid;place-items:center}
.sgp .hub-logo span{width:62px;height:62px;border-radius:14px;background:#7C5CD6;transform:rotate(-12deg)}
.sgp .hub-side h2{font-size:34px;font-weight:600;letter-spacing:-.02em;margin-top:34px;line-height:1.15}
.sgp .hub-join{display:flex;align-items:center;gap:16px;padding:26px 0;margin-top:34px;border:none;border-top:1px solid var(--line);font-size:19px;color:#3F3F46;background:none;width:100%;cursor:pointer;font-family:inherit}
.sgp .hub-join .arw{margin-left:auto;color:#3F3F46}
.sgp .hub-main{flex:1;padding:44px 46px;min-width:0}
.sgp .hub-hi{font-size:17px;color:#6B7280}
.sgp .hub-main h1{font-size:38px;font-weight:600;letter-spacing:-.02em;margin:8px 0 32px}
.sgp .hub-grid{display:grid;grid-template-columns:1fr 1fr;gap:26px;align-items:start}
.sgp .hub-card{border:1px solid var(--line);border-radius:14px;padding:26px}
.sgp .hub-card-head{display:flex;align-items:center;margin-bottom:24px}
.sgp .hub-card-head h3{font-size:23px;font-weight:600;letter-spacing:-.01em}
.sgp .hub-card-head button{margin-left:auto;background:none;border:none;color:#2C6ECB;font-size:16px;cursor:pointer;font-family:inherit;display:flex;align-items:center;gap:7px}
.sgp .grp-card{border:1px solid var(--line);border-radius:10px;overflow:hidden;width:100%;max-width:390px;background:none;padding:0;cursor:pointer;text-align:left;font-family:inherit}
.sgp .grp-card:hover{box-shadow:0 3px 14px rgba(0,0,0,.09)}
.sgp .grp-cover{height:150px;background:linear-gradient(150deg,#8FC45C,#4E7A32);position:relative}
.sgp .grp-cover::after{content:"";position:absolute;right:34px;top:50%;transform:translateY(-50%);width:78px;height:78px;border-radius:50%;background:#fff;box-shadow:0 2px 8px rgba(0,0,0,.18)}
.sgp .grp-card p{padding:16px;font-size:15px;font-weight:600}
.sgp .hub-empty{display:grid;place-items:center;padding:34px 10px;gap:18px}
.sgp .hub-empty p{font-size:16px;color:#6B7280}
@media (max-width:980px){.sgp .hub{flex-direction:column}.sgp .hub-side{width:100%;border-right:none;border-bottom:1px solid var(--line)}.sgp .hub-grid{grid-template-columns:1fr}}
`;

const D = {
  home: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>',
  house:
    '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',
  mail: '<path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"/><polyline points="22,6 12,13 2,6"/>',
  heart:
    '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21.2l7.8-7.8 1.1-1.1a5.5 5.5 0 0 0 0-7.8z"/>',
  cal: '<rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>',
  bulb: '<line x1="12" y1="2" x2="12" y2="5"/><line x1="12" y1="19" x2="12" y2="22"/><circle cx="12" cy="12" r="4"/><line x1="4.9" y1="4.9" x2="7" y2="7"/><line x1="17" y1="17" x2="19.1" y2="19.1"/>',
  rocket:
    '<path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91 0z"/><path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>',
  case: '<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>',
  pin: '<line x1="12" y1="17" x2="12" y2="22"/><path d="M5 17h14l-1.5-3.5V9a5.5 5.5 0 0 0-11 0v4.5z"/>',
  mega: '<path d="M3 11l18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/>',
  like: '<path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/>',
  cmt: '<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>',
  clock: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
  glob: '<circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>',
  srch: '<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>',
  bell: '<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>',
  sun: '<circle cx="12" cy="12" r="4"/><line x1="12" y1="2" x2="12" y2="4"/><line x1="12" y1="20" x2="12" y2="22"/><line x1="4.9" y1="4.9" x2="6.3" y2="6.3"/><line x1="17.7" y1="17.7" x2="19.1" y2="19.1"/><line x1="2" y1="12" x2="4" y2="12"/><line x1="20" y1="12" x2="22" y2="12"/><line x1="4.9" y1="19.1" x2="6.3" y2="17.7"/><line x1="17.7" y1="6.3" x2="19.1" y2="4.9"/>',
  x: '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
  chevU: '<polyline points="18 15 12 9 6 15"/>',
  chevL: '<polyline points="15 18 9 12 15 6"/>',
  chevR: '<polyline points="9 18 15 12 9 6"/>',
  updn: '<polyline points="7 15 12 20 17 15"/><polyline points="7 9 12 4 17 9"/>',
  info: '<circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>',
  lock: '<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
  copy: '<rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',
  doc: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>',
  tick: '<polyline points="20 6 9 17 4 12"/>',
};

function Ic({ d, s = 18 }: { d: string; s?: number }) {
  return (
    <svg
      width={s}
      height={s}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      dangerouslySetInnerHTML={{ __html: d }}
    />
  );
}

function Kite({ w = 170 }: { w?: number }) {
  return (
    <svg
      width={w}
      height={w * 0.72}
      viewBox="0 0 240 172"
      fill="none"
      stroke="#B8B8C0"
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M64 12 L44 44 L74 66 L94 32 Z" />
      <path d="M74 66 C86 84 92 104 88 124" />
      <path d="M88 124 c8-4 8 8 0 10 c-8 2-8-14 0-10" />
      <circle cx="176" cy="46" r="13" />
      <path d="M176 59 v34" />
      <path d="M176 68 L150 60" />
      <path d="M150 60 L74 66" />
      <path d="M176 68 L200 84" />
      <path d="M176 93 L160 140 L152 166" />
      <path d="M176 93 L196 140 L204 166" />
      <path d="M8 166 H232" strokeDasharray="3 9" />
    </svg>
  );
}

type Post = { t: string; ch?: string; ttl: string; b: string; th?: boolean; thc?: string };

const CHANNELS = [
  { id: "home", name: "Home", icon: D.home, divider: true },
  { id: "talk", name: "Talk To Shella", icon: D.mail },
  { id: "adv", name: "Your Golf Advantage", icon: D.heart },
  { id: "class", name: "Class Schedule Overview", icon: D.cal },
  { id: "lessons", name: "Group Golf Lessons", icon: D.bulb },
  { id: "promo", name: "Promotional Codes", icon: D.rocket },
  { id: "webinar", name: "Webinar Replays", icon: D.case },
  { id: "mulligan", name: "Monday Mulligan", icon: D.pin },
  { id: "event", name: "Event Annoucement", icon: D.mega },
];
const TABS = ["Discussion", "Learning", "Events", "Leaderboard", "Members", "About"];

const MULLIGAN: Post[] = [
  { t: "1w ago", ttl: "Do You Need a Driver?", th: true, b: "It's time for your Monday Mulligan. Today we're removing pressure. You do NOT need a driver to start playing golf. Why beginners struggle with it: • Harder to contro…" },
  { t: "2w ago", ttl: "Hybrid Clubs", th: true, b: "It's time for your Monday Mulligan. Let's talk about one of the most beginner-friendly clubs in your bag. A hybrid is a mix between a wood and an iron. It's designed to: •…" },
  { t: "3w ago", ttl: "Woods vs Irons vs Wedges", th: true, b: "It's time for your Monday Mulligan. Today, we're simplifying your club selection. There are three main types you need to understand: • Woods: long-distance shots •…" },
  { t: "1mo ago", ttl: "Components of a Golf Club", th: true, b: "It's time for your Monday Mulligan. Today, we're getting familiar with your equipment, because confidence starts here. Every golf club has three main parts: • Grip: where…" },
  { t: "1mo ago", ttl: "How Many Clubs Can You Carry?", th: true, b: "It's time for your Monday Mulligan. Let's simplify what goes in your bag. You can carry up to 14 clubs. That includes: • Driver • Woods • Irons • Wedges • Putter •…" },
];

const FEED: Record<string, { posts?: Post[]; featured?: { ttl: string; t: string }; empty?: string; nocap?: string }> = {
  home: {
    posts: [
      { t: "2h ago", ch: "Talk To Shella", ttl: "How Many Clubs Can You Carry?", th: true, b: "It's time for your Monday Mulligan. Let's simplify what goes in your bag. You can carry up to 14 clubs. That includes: • Driver • Woods • Irons • Wedges • Putter •…" },
      { t: "1w ago", ch: "Monday Mulligan", ttl: "Do You Need a Driver?", th: true, b: "It's time for your Monday Mulligan. Today we're removing pressure. You do NOT need a driver to start playing golf. Why beginners struggle with it: • Harder to contro…" },
      { t: "2w ago", ch: "Monday Mulligan", ttl: "Hybrid Clubs", th: true, b: "It's time for your Monday Mulligan. Let's talk about one of the most beginner-friendly clubs in your bag. A hybrid is a mix between a wood and an iron. It's designed to: •…" },
    ],
  },
  talk: {
    posts: [
      { t: "2h ago", ttl: "How Many Clubs Can You Carry?", th: true, b: "It's time for your Monday Mulligan. Let's simplify what goes in your bag. You can carry up to 14 clubs. That includes: • Driver • Woods • Irons • Wedges • Putter •…" },
      { t: "7mo ago", ttl: "Schedule your One-On-One time with Shella", b: '<a href="https://www.calendly.com/sistergolf" target="_blank" rel="noreferrer">www.calendly.com/sistergolf</a>' },
    ],
  },
  adv: {
    posts: [
      { t: "7mo ago", ttl: "Benefits designed to help you play with confidence and consiste…", th: true, thc: "linear-gradient(150deg,#F276B4,#D6246E)", b: "Inside the Club 😎" },
    ],
  },
  class: {
    featured: { ttl: "2026 Rolling Class Schedule", t: "7mo ago" },
    posts: [
      { t: "7mo ago", ttl: "2026 Rolling Class Schedule", th: true, b: "March – May Lessons (Every Other Week) Sat Mar 7 — Foundations &amp; Fundamentals Wed Mar 18 — Putting Wed Apr 1 — Chipping &amp; Pitching Wed Apr 15 — Full Swing…" },
    ],
  },
  lessons: {
    posts: [
      { t: "7mo ago", ttl: "Foundations and Fundamentals", th: true, b: "This class is designed to build the foundation for every other golf lesson that follows. Golfers focus on proper grip, posture, stance, and setup, which are essenti…" },
      { t: "7mo ago", ttl: "Putting", th: true, b: "Putting is a critical part of the game and accounts for a significant portion of shots during a round of golf. This class focuses on developing precision, patience, and…" },
      { t: "7mo ago", ttl: "Chipping and Pitching", th: true, b: "This combined short game class focuses on shots played around the green, where touch and control matter most. Chipping instruction covers shots taken just off the…" },
      { t: "7mo ago", ttl: "Full Swing", th: true, b: "The full swing class focuses on combining power and accuracy for longer iron shots. Instruction emphasizes proper sequencing, rotation, and weight transfer to…" },
      { t: "7mo ago", ttl: "Driver", th: true, b: "The driver class is designed to help golfers hit the ball farther and with more confidence off the tee. Since the driver is the longest club in the bag, proper setup…" },
    ],
  },
  promo: {
    posts: [
      { t: "2mo ago", ttl: "Play Dates", b: "$15, using the Coupon Code:1996TKT plus your own green fees" },
      { t: "2mo ago", ttl: "Practice Sessions", b: "Free using the coupon code: Z8YAIZ7 Plus range ball fees" },
    ],
  },
  webinar: { nocap: "Webinar Replays" },
  mulligan: { posts: MULLIGAN },
  event: { posts: [], empty: "No posts found" },
};

const LB = [
  { r: 1, n: "adaluzbneth", p: "+0", i: "A", pl: true },
  { r: 2, n: "John Coax", p: "+0", i: "JC", pl: true },
  { r: 3, n: "Kristian Collins", p: "+0" },
  { r: 4, n: "Meta Eatman", p: "+0" },
];
const LB_ALL = [
  { r: 1, n: "John Coax", p: "+11", i: "JC", pl: true },
  { r: 2, n: "Tracie Threadford", p: "+0" },
  { r: 3, n: "Darlene Wilson Gallien", p: "+0", i: "DW", pl: true },
  { r: 4, n: "adaluzbneth", p: "+0", i: "A", pl: true },
  { r: 5, n: "Kristian Collins", p: "+0" },
  { r: 6, n: "Meta Eatman", p: "+0" },
];
const LEVELS: [string, string][] = [
  ["Level 1 - Event Credits", "91% of members"],
  ["Level 2 - Education Point", "9% of members"],
  ["Level 3 - 1 - 1 Class", "0% of members"],
  ["Level 4 - Play Date", "0% of members"],
  ["Level 5 - Practice Date", "0% of members"],
  ["Level 6 - Tournament", "0% of members"],
  ["Level 7 - Volunteer", "0% of members"],
  ["Level 8 - Mentor", "0% of members"],
  ["Level 9 - Master", "0% of members"],
];

const MEMBERS = [
  { n: "Marquet Harris", h: "@marquet-harris-8nX2dK", l: 1, a: "Active 2w ago", j: "Joined 30 Jul 2026", e: "marquetdharris@gmail.com", i: "M", c: "#D6246E", role: "Active" },
  { n: "Meta Eatman", h: "@meta-eatman-7nRMsu", l: 1, a: "Active 1mo ago", j: "Joined 01 Jul 2026", e: "mightymeta@gmail.com", role: "Active" },
  { n: "Kristian Collins", h: "@kristian-collins-0jJtp7", l: 1, a: "Active 2w ago", j: "Joined 30 Jun 2026", e: "kristian.collins@streamcompanies.com", role: "Active" },
  { n: "John Ericson Fariola", h: "@john-ericson-9uRaTe", l: 2, a: "Active 1mo ago", j: "Joined 30 Jun 2026", e: "sales@coaxbusinessmarketing.com", role: "Admins" },
  { n: "adaluzbneth", h: "@adaluzbneth-4qZNMl", l: 1, a: "Active 1mo ago", j: "Joined 30 Jun 2026", e: "adaluzbneth@gmail.com", i: "A", c: "#E4E4E8", dk: true, role: "Active" },
  { n: "Darlene Wilson Gallien", h: "@darlene-wilson-2cQehX", l: 1, a: "Active 5mo ago", j: "Joined 28 Feb 2026", e: "wilsondlm@yahoo.com", i: "DW", c: "#E4E4E8", dk: true, role: "Active" },
  { n: "Tracie Threadford", h: "@tracie-threadford-0bFWVM", l: 1, a: "Active 1w ago", j: "Joined 24 Feb 2026", e: "mrstraciebthread@gmail.com", role: "Active", bio: "Tracie B. Threadford is Mayor of Tarrant and a finance professional with 30+ years’ experience. She champions transparency, innovation, and community growth while serving with resilience and integrity" },
  { n: "Shella Sylla", h: "@shella-sylla-0iV92p", l: 1, a: "Active 15m ago", j: "Joined 22 Jan 2026", e: "shella@sistergolf.com", role: "Admins" },
  { n: "Joel Test User", h: "@joel-snyder-8hFHbc", l: 1, a: "Active 2w ago", j: "Joined 21 Jan 2026", e: "joel@coaxconsulting.com", role: "Admins" },
  { n: "Shella Sylla", h: "@ada-boneth-2qNFOT", l: 1, a: "Active 2h ago", j: "Joined 16 Dec 2025", e: "admin@coaxconsulting.com", role: "Admins" },
  { n: "John Ericson Fariola", h: "@john-ericson-9uRaTe", l: 1, a: "Active 2w ago", j: "Joined 26 Nov 2025", e: "sales@coaxbusinessmarketing.com", role: "Active" },
];

const SETTINGS_NAV = ["Details", "Subscriptions", "Newsletter", "Branding", "Themes", "Show / Hide Tabs", "Membership Questions", "Gamification & Rewards", "Links", "Reported Content", "Import", "Discovery"];

function MembershipPreview() {
  const [stage, setStage] = useState<"login" | "hub" | "app">("login");
  const [channel, setChannel] = useState("home");
  const [tab, setTab] = useState("Discussion");
  const [overlay, setOverlay] = useState<string | null>(null);
  const [spane, setSpane] = useState("Details");
  const [mfilter, setMfilter] = useState("Active");
  const [liked, setLiked] = useState<Set<string>>(new Set());
  const [featOpen, setFeatOpen] = useState(true);
  const [toggles, setToggles] = useState({ priv: false, readonly: false });
  const [access, setAccess] = useState("Public");
  const [checks, setChecks] = useState({ switcher: true, invite: false, profile: true });

  const close = () => setOverlay(null);
  const toggleLike = (k: string) =>
    setLiked((prev) => {
      const n = new Set(prev);
      n.has(k) ? n.delete(k) : n.add(k);
      return n;
    });

  const Acts = ({ k }: { k: string }) => (
    <div className="pacts">
      <button className={"pact" + (liked.has(k) ? " on" : "")} onClick={() => toggleLike(k)}>
        <Ic d={D.like} s={17} /> {liked.has(k) ? 1 : 0}
      </button>
      <button className="pact">
        <Ic d={D.cmt} s={17} /> 0
      </button>
    </div>
  );

  const NoCap = ({ name }: { name: string }) => (
    <div className="nocap">
      <Kite w={150} />
      <h3>{name}</h3>
      <p>
        This section hasn&apos;t been captured from the live portal yet, so it isn&apos;t part of this
        preview. Everything else here is a working replica.
      </p>
    </div>
  );

  const PostCard = ({ p, k }: { p: Post; k: string }) => (
    <article className="post">
      <div className="phead">
        <div className="pav">
          <div className="avatar" />
          <span className="lvl">1</span>
        </div>
        <div>
          <div className="pauth">Shella Sylla</div>
          <div className="pmeta">
            {p.t}
            {p.ch ? (
              <>
                {" in "}
                <span className="ch">{p.ch}</span>
              </>
            ) : null}
          </div>
        </div>
        <button className="pmenu" aria-label="Post options">···</button>
      </div>
      <div className="pbody">
        <div className="ptext">
          <h3 className="ptitle">{p.ttl}</h3>
          <p className="pexc" dangerouslySetInnerHTML={{ __html: p.b }} />
        </div>
        {p.th ? <div className="pthumb" style={p.thc ? { background: p.thc } : undefined} /> : null}
      </div>
      <Acts k={k} />
    </article>
  );

  const GroupCard = () => (
    <div className="card">
      <div className="cover" />
      <div className="gbody">
        <h2 className="gname">Sistergolf Membership</h2>
        <div className="gpriv">
          <Ic d={D.glob} s={14} /> Public Group
        </div>
        <p className="gdesc">
          Using golf as a tool for developing mutually beneficial business relationships for women
          business professionals.
        </p>
        <div className="gstats">
          <div><div className="snum">11</div><div className="slab">Members</div></div>
          <div><div className="snum">16</div><div className="slab">Posts</div></div>
          <div><div className="snum">4</div><div className="slab">Admin</div></div>
        </div>
        <div className="mavs">
          <div style={{ background: "#D6246E" }}>M</div>
          <div /><div /><div />
          <div style={{ background: "#E4E4E8", color: "#3F3F46" }}>A</div>
          <div style={{ background: "#E4E4E8", color: "#3F3F46", fontSize: 9.5 }}>DW</div>
          <div /><div /><div />
        </div>
        <button className="b-out" onClick={() => setOverlay("settings")}>SETTINGS</button>
        <button className="b-pink">INVITE MEMBERS</button>
      </div>
    </div>
  );

  const LbCard = ({ title, rows, see }: { title: string; rows: typeof LB; see?: boolean }) => (
    <div className="card">
      <div className="lbh">{title}</div>
      {rows.map((x) => (
        <div className="lbrow" key={x.r + x.n}>
          <span className={"rank " + (x.r <= 3 ? "r" + x.r : "pl")}>{x.r}</span>
          <div className="avatar" style={{ width: 30, height: 30, ...(x.pl ? { background: "#F2F2F4", color: "#6B7280" } : {}) }}>{x.i || ""}</div>
          <span className="lbname">{x.n}</span>
          <span className="lbpts">{x.p}</span>
        </div>
      ))}
      {see ? <button className="lbsee" onClick={() => setTab("Leaderboard")}>See all leaderboards</button> : null}
    </div>
  );

  function Feed() {
    const f = FEED[channel] || {};
    if (f.nocap) return <NoCap name={f.nocap} />;
    return (
      <>
        <div className="composer">
          <div className="avatar" />
          <input placeholder="What's on your mind, Shella?" readOnly />
          <button className="go-live">
            <span className="live-dot">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="#fff">
                <path d="M23 7l-7 5 7 5V7z" />
                <rect x="1" y="5" width="15" height="14" rx="2" />
              </svg>
            </span>
            Go Live
          </button>
        </div>
        {f.featured ? (
          <div className="featured">
            <div className="fh">
              <h3>Featured</h3>
              <Ic d={D.info} s={16} />
              <button className={"ftog" + (featOpen ? "" : " col")} onClick={() => setFeatOpen(!featOpen)} aria-label="Toggle featured">
                <Ic d={D.chevU} s={18} />
              </button>
            </div>
            {featOpen ? (
              <div className="ftrack">
                <button className="cbtn prev"><Ic d={D.chevL} s={18} /></button>
                <div className="fcard">
                  <div className="fchead">
                    <div className="pav"><div className="avatar" /><span className="lvl">1</span></div>
                    <div><div className="pauth">Shella Sylla</div><div className="pmeta">{f.featured.t}</div></div>
                    <button className="pmenu">···</button>
                  </div>
                  <h4>{f.featured.ttl}</h4>
                  <div className="fmedia" />
                  <Acts k="feat" />
                </div>
                <button className="cbtn next"><Ic d={D.chevR} s={18} /></button>
              </div>
            ) : null}
          </div>
        ) : null}
        {f.posts && f.posts.length ? (
          f.posts.map((p, i) => <PostCard key={channel + i} p={p} k={channel + i} />)
        ) : (
          <div className="empty"><Kite /><h3>{f.empty || "No posts found"}</h3></div>
        )}
      </>
    );
  }

  function Leaderboard() {
    const row = (i: number) => (
      <div className="lrow" key={LEVELS[i][0]}>
        <div className={"lic" + (i === 0 ? " cur" : "")}>{i === 0 ? 1 : <Ic d={D.lock} s={17} />}</div>
        <div><div className="lname">{LEVELS[i][0]}</div><div className="lpct">{LEVELS[i][1]}</div></div>
      </div>
    );
    return (
      <>
        <div className="pcard">
          <div className="pme">
            <div className="ring"><span className="tick" /><span className="bdg">1</span></div>
            <div className="pname">Shella Sylla</div>
            <div className="plvl">Level 1 - Event Credits</div>
            <div className="pnext"><span><strong>+5</strong> points to level up</span><Ic d={D.info} s={15} /></div>
          </div>
          <div>{[0, 1, 2, 3, 4].map(row)}</div>
          <div>{[5, 6, 7, 8].map(row)}</div>
        </div>
        <div className="lupd">Last updated: Jul 1 2026 15:59</div>
        <div className="lcols">
          <LbCard title="Leaderboard (7-days)" rows={LB} />
          <LbCard title="Leaderboard (30-days)" rows={LB} />
          <LbCard title="Leaderboard (All time)" rows={LB_ALL} />
        </div>
      </>
    );
  }

  function Members() {
    const counts: [string, number | null][] = [["Active", 11], ["Admins", 4], ["Contributors", null], ["Requested", 0], ["Banned", null]];
    const list = mfilter === "Active" ? MEMBERS : MEMBERS.filter((m) => m.role === mfilter);
    return (
      <>
        <div className="filters">
          {counts.map(([l, n]) => (
            <button key={l} className={"pill" + (mfilter === l ? " active" : "")} onClick={() => setMfilter(l)}>
              {l}{n !== null ? <span>{n}</span> : null}
            </button>
          ))}
          <div className="msearch"><Ic d={D.srch} s={17} /><input placeholder="Search Member" readOnly /></div>
        </div>
        <div className="mlist">
          {list.length ? list.map((m, i) => (
            <div className="mem" key={m.h + i}>
              <div className="memav">
                <div className="avatar" style={{ ...(m.c ? { background: m.c } : {}), ...(m.dk ? { color: "#3F3F46" } : {}) }}>{m.i || ""}</div>
                <span className="lvl">{m.l}</span>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="memname">{m.n}</div>
                <div className="memh">{m.h}</div>
                {m.bio ? <p className="membio">{m.bio}</p> : null}
                <div className="memmeta"><Ic d={D.clock} s={17} />{m.a}</div>
                <div className="memmeta"><Ic d={D.cal} s={17} />{m.j}</div>
                <div className="memmeta"><Ic d={D.mail} s={17} />{m.e}</div>
              </div>
              <button className="memmenu">⋮</button>
            </div>
          )) : <div className="empty"><Kite /><h3>No members found</h3></div>}
        </div>
      </>
    );
  }

  if (stage === "login") {
    return (
      <div className="sgp">
        <style dangerouslySetInnerHTML={{ __html: CSS }} />
        <div className="login-wrap">
          <div className="login">
            <h1>Login</h1>
            <button className="goog">
              <svg width="22" height="22" viewBox="0 0 48 48">
                <path fill="#4285F4" d="M45 24.5c0-1.6-.1-2.8-.4-4H24v7.3h12c-.2 2-1.5 5-4.4 7l6.7 5.2c4-3.7 6.7-9.1 6.7-15.5z" />
                <path fill="#34A853" d="M24 46c5.9 0 10.9-2 14.5-5.3l-6.9-5.4c-1.9 1.3-4.4 2.2-7.6 2.2-5.8 0-10.7-3.8-12.5-9.800000000000001l-7.1 5.5C7.9 40.6 15.4 46 24 46z" />
                <path fill="#FBBC05" d="M11.5 27.7c-.5-1.4-.7-2.9-.7-4.4s.3-3 .7-4.4l-7.1-5.5C2.9 16.3 2 19.9 2 23.7s.9 7.4 2.4 10.5l7.1-6.5z" />
                <path fill="#EA4335" d="M24 9.6c3.3 0 5.5 1.4 6.8 2.6l5.9-5.8C33 3 28.9 1 24 1 15.4 1 7.9 6.4 4.4 13.4l7.1 5.5C13.3 13.4 18.2 9.6 24 9.6z" />
              </svg>
              Continue with Google
            </button>
            <div className="divider">Or, sign in with your email</div>
            <div className="lfield">
              <Ic d={D.mail} s={20} />
              <input defaultValue="shella@sistergolf.com" aria-label="Email" />
            </div>
            <div className="lfield">
              <Ic d={D.lock} s={20} />
              <input type="password" defaultValue="Membership2026!" aria-label="Password" />
            </div>
            <button className="forgot">Forgot password?</button>
            <button className="b-login" onClick={() => setStage("hub")}>Login</button>
            <button className="b-secure" onClick={() => setStage("hub")}>Login with secure code</button>
            <div className="newuser">New user? <button>Sign up</button></div>
          </div>
        </div>
      </div>
    );
  }

  if (stage === "hub") {
    return (
      <div className="sgp">
        <style dangerouslySetInnerHTML={{ __html: CSS }} />
        <div style={{ maxWidth: 1500, margin: "0 auto", padding: "24px 16px" }}>
          <div className="hub">
            <aside className="hub-side">
              <div className="hub-logo"><span /></div>
              <h2>SisterGolf Members</h2>
              <button className="hub-join">
                <Ic d={D.home} s={24} />
                Join a Group
                <span className="arw"><Ic d={D.chevR} s={22} /></span>
              </button>
            </aside>
            <div className="hub-main">
              <div className="hub-hi">Hi, Shella Sylla</div>
              <h1>Welcome to SisterGolf Members</h1>
              <div className="hub-grid">
                <div className="hub-card">
                  <div className="hub-card-head">
                    <h3>Recently opened</h3>
                    <button>View all Groups</button>
                  </div>
                  <button className="grp-card" onClick={() => setStage("app")}>
                    <div className="grp-cover" />
                    <p>Sistergolf Membership</p>
                  </button>
                </div>
                <div className="hub-card">
                  <div className="hub-card-head">
                    <h3>Shared Files</h3>
                    <button>+ Add Files</button>
                  </div>
                  <div className="hub-empty">
                    <svg width="120" height="96" viewBox="0 0 120 96" fill="none">
                      <path d="M8 20a6 6 0 0 1 6-6h28l10 10h54a6 6 0 0 1 6 6v46a6 6 0 0 1-6 6H14a6 6 0 0 1-6-6z" fill="#8AB4F8" />
                      <path d="M8 34h104v36a6 6 0 0 1-6 6H14a6 6 0 0 1-6-6z" fill="#AECBFA" />
                    </svg>
                    <p>You don&apos;t have any!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const isLB = tab === "Leaderboard";
  let body: React.ReactNode;
  let right: React.ReactNode = null;
  if (tab === "Discussion") {
    body = <Feed />;
    right = <div><GroupCard /><LbCard title="Leaderboard (30-days)" rows={LB} see /></div>;
  } else if (isLB) {
    body = <Leaderboard />;
  } else if (tab === "Members") {
    body = <Members />;
    right = <div><GroupCard /></div>;
  } else {
    body = <NoCap name={tab} />;
    right = <div><GroupCard /></div>;
  }

  return (
    <div className="sgp">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "24px 16px" }}>
        <div className="app">
          <nav className="rail" aria-label="Workspaces">
            <button className="rail-btn active" onClick={() => { setChannel("home"); setTab("Discussion"); }} aria-label="Home">
              <Ic d={D.house} s={20} />
            </button>
            <button className="rail-btn" aria-label="Communities"><Ic d={D.home} s={20} /></button>
          </nav>

          {isLB ? (
            <aside className="sidebar">
              <div className="swag"><h3>SisterGolf Swag</h3><p>Options based on availability.</p></div>
              <button className="side-btn">+ ADD REWARDS</button>
            </aside>
          ) : (
            <aside className="sidebar">
              <div className="channels">
                {CHANNELS.map((c) => (
                  <div key={c.id}>
                    <button
                      className={"channel" + (c.id === channel && tab === "Discussion" ? " active" : "")}
                      onClick={() => { setChannel(c.id); setTab("Discussion"); }}
                    >
                      <Ic d={c.icon} />{c.name}
                    </button>
                    {c.divider ? <div className="cdiv" /> : null}
                  </div>
                ))}
              </div>
              <button className="side-btn" onClick={() => setOverlay("addchannel")}>+ ADD CHANNEL</button>
            </aside>
          )}

          <div className="main">
            <header className="topbar">
              <div className="ws">
                <div className="ws-icon"><Ic d={D.home} s={17} /></div>
                <span className="ws-name">Sistergolf Membership</span>
                <span style={{ color: "#9A9AA2", display: "grid", placeItems: "center" }}><Ic d={D.updn} s={14} /></span>
              </div>
              <div className="search"><Ic d={D.srch} s={17} /><input placeholder="Search" aria-label="Search" readOnly /></div>
              <div className="top-actions">
                <button aria-label="Theme"><Ic d={D.sun} s={20} /></button>
                <button aria-label="Apps">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    {[5, 12, 19].map((cy) => [5, 12, 19].map((cx) => <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="1.7" />))}
                  </svg>
                </button>
                <button aria-label="Notifications"><Ic d={D.bell} s={20} /></button>
                <div className="avatar" />
              </div>
            </header>

            <nav className="tabbar">
              {TABS.map((t) => (
                <button key={t} className={"tab" + (t === tab ? " active" : "")} onClick={() => setTab(t)}>{t}</button>
              ))}
              <button className="chat-btn" onClick={() => setOverlay("chat")}>Chat</button>
            </nav>

            <div className="content">
              <div className={"grid" + (right ? "" : " full")}>
                <div>{body}</div>
                {right}
              </div>
            </div>
          </div>

          {overlay === "addchannel" ? (
            <>
              <div className="scrim" onClick={close} />
              <div className="modal" role="dialog" aria-label="Add Channel">
                <div className="mhead">
                  <div>
                    <h2>Add Channel</h2>
                    <p>Expand community: Add channels for diverse discussions, collaboration and connection.</p>
                  </div>
                  <button className="mx" onClick={close} aria-label="Close"><Ic d={D.x} s={22} /></button>
                </div>
                <div className="mbody">
                  <div className="field">
                    <label>Name<span className="req">*</span></label>
                    <div className="inp"><span style={{ fontSize: 17 }}>#</span><input placeholder="e.g Marketing Reports" /><span className="cnt">0 / 25</span></div>
                  </div>
                  <div className="field">
                    <label>Description</label>
                    <div className="inp"><Ic d={D.doc} /><input placeholder="Enter Description" /><span className="cnt">0 / 60</span></div>
                  </div>
                  <div className="field">
                    <label>Channel Icon</label>
                    <div className="inp"><span style={{ fontSize: 17 }}>#</span><input placeholder="Hash02Icon" /></div>
                  </div>
                  <div className="field">
                    <label>Access<span className="req">*</span></label>
                    <div className="trow">
                      <div><h4>Make this channel private</h4><p>Invited Members Only. Non members will not see this space</p></div>
                      <button className={"tg" + (toggles.priv ? " on" : "")} onClick={() => setToggles({ ...toggles, priv: !toggles.priv })} aria-label="Make this channel private" />
                    </div>
                    <div className="trow">
                      <div><h4>Read Only Channel</h4><p>Members can view important informations and updates, but only admins/owners of the channel can post here.</p></div>
                      <button className={"tg" + (toggles.readonly ? " on" : "")} onClick={() => setToggles({ ...toggles, readonly: !toggles.readonly })} aria-label="Read Only Channel" />
                    </div>
                  </div>
                  <button className="b-pink" style={{ padding: 16 }} onClick={close}>CREATE CHANNEL</button>
                </div>
              </div>
            </>
          ) : null}

          {overlay === "settings" ? (
            <>
              <div className="scrim" onClick={close} />
              <div className="modal wide" role="dialog" aria-label="Group Settings">
                <div className="mhead">
                  <div className="ws-icon" style={{ width: 46, height: 46, borderRadius: 12 }}><Ic d={D.home} s={22} /></div>
                  <div><h2>Sistergolf Membership</h2><p style={{ marginTop: 2, color: "#6B7280" }}>Group Settings</p></div>
                  <button className="mx" onClick={close} aria-label="Close"><Ic d={D.x} s={22} /></button>
                </div>
                <div className="swrap">
                  <nav className="snav-wrap">
                    {SETTINGS_NAV.map((n) => (
                      <button key={n} className={"snav" + (spane === n ? " active" : "")} onClick={() => setSpane(n)}>{n}</button>
                    ))}
                  </nav>
                  <div className="sbody">
                    {spane === "Details" ? (
                      <>
                        <h3>Update Group Details</h3>
                        <div className="sub">Update your group details here</div>
                        <div className="field"><label>Group Name</label><div className="inp"><input defaultValue="Sistergolf Membership" /></div></div>
                        <div className="field">
                          <label>URL</label>
                          <div className="urow">
                            <div className="base">https://sistergolf.app.clientclub.net/communities/groups/</div>
                            <div className="slug">sistergolf-membership <Ic d={D.copy} s={17} /></div>
                          </div>
                        </div>
                        <div className="field">
                          <label>Description</label>
                          <div className="inp" style={{ alignItems: "flex-start" }}>
                            <textarea rows={4} defaultValue="Using golf as a tool for developing mutually beneficial business relationships for women business professionals." />
                          </div>
                          <div style={{ textAlign: "right", fontSize: 13, color: "#9CA3AF", marginTop: 6 }}>112 / 150</div>
                        </div>
                        <div className="ogrid">
                          <button className={"opt" + (access === "Public" ? " sel" : "")} onClick={() => setAccess("Public")}>
                            <span className={"radio" + (access === "Public" ? " on" : "")} />
                            <div><h4>Public</h4><p>Anyone can see the group posts and other members of the group</p></div>
                          </button>
                          <button className={"opt" + (access === "Private" ? " sel" : "")} onClick={() => setAccess("Private")}>
                            <span className={"radio" + (access === "Private" ? " on" : "")} />
                            <div><h4>Private</h4><p>Only members can see the group posts and other members of the group</p></div>
                          </button>
                          <button className="opt" onClick={() => setChecks({ ...checks, switcher: !checks.switcher })}>
                            <span className={"chk" + (checks.switcher ? " on" : "")}>{checks.switcher ? <Ic d={D.tick} s={12} /> : null}</span>
                            <div><h4>Accessible from switcher</h4><p>Your group will be visible to non group members in the switcher</p></div>
                          </button>
                          <button className="opt" onClick={() => setChecks({ ...checks, invite: !checks.invite })}>
                            <span className={"chk" + (checks.invite ? " on" : "")}>{checks.invite ? <Ic d={D.tick} s={12} /> : null}</span>
                            <div><h4>Allow members to invite new members</h4><p>Hides the invite button for members when turned off. Members can only invite others if this is enabled.</p></div>
                          </button>
                          <button className="opt" onClick={() => setChecks({ ...checks, profile: !checks.profile })}>
                            <span className={"chk" + (checks.profile ? " on" : "")}>{checks.profile ? <Ic d={D.tick} s={12} /> : null}</span>
                            <div><h4>Show mandatory profile modal</h4><p>When enabled, members will be prompted to complete their profile information when joining the group.</p></div>
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <h3>{spane}</h3>
                        <div className="sub">Group settings</div>
                        <NoCap name={spane} />
                      </>
                    )}
                  </div>
                </div>
                <div className="mfoot">
                  <button className="b-ghost" onClick={close}>Cancel</button>
                  <button className="b-save" onClick={close}>Save</button>
                </div>
              </div>
            </>
          ) : null}

          {overlay === "chat" ? (
            <>
              <div className="scrim" style={{ background: "transparent" }} onClick={close} />
              <div className="chatp" role="dialog" aria-label="Chat">
                <h2>Chat</h2>
                <div className="inp" style={{ borderRadius: 10 }}><Ic d={D.srch} /><input placeholder="Search Member" /></div>
                <div className="empty">
                  <Kite w={190} />
                  <h3>No conversations found</h3>
                  <p>Looks like you haven&apos;t chatted with anyone yet. Search a contact and take the first step!</p>
                  <button className="b-pink" style={{ width: "auto", padding: "13px 30px", marginTop: 16 }} onClick={close}>Start Chatting</button>
                </div>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}

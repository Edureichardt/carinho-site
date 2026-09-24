import { useEffect,useRef,useState } from "react";
import { X } from "lucide-react";
import { unlockSecret } from "../secretSystem";
const WORLD={w:2200,h:1550}, clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
const fragments=[
 [210,220,"🌸","Um lírio. Parece que o jardim estava esperando você."],
 [610,180,"🍂","As folhas guardam histórias. Talvez algumas delas sejam nossas."],
 [1030,245,"💙","O azul voltou para uma parte do jardim."],
 [1480,210,"🏐","Tem lugares que parecem comuns até alguém especial fazer parte da memória deles."],
 [1540,790,"🎵","Uma música perdida encontrou o caminho de volta."],
 [1080,1010,"✨","Algumas luzes só aparecem depois que a gente chega perto."],
 [570,970,"🌷","Mais uma coisa floresceu por sua causa."],
 [245,800,"🤍","O último fragmento. O centro do jardim parece diferente agora."],
];
const memories=[[355,430,"📷"],[850,390,"📷"],[1340,470,"📷"],[1260,925,"📷"],[470,720,"📷"],[1870,360,"📷"],[1830,1190,"📷"],[1030,1370,"📷"]];
const spiders=[[500,320,280,740],[1150,560,1010,1390],[700,850,560,900],[1430,690,1290,1600],[1850,420,1700,2050],[1750,1050,1580,2040],[1100,1280,930,1330]];
const trees=Array.from({length:52},(_,i)=>[80+(i*233)%2040,100+(i*157)%1350]);
const CAT_NPCS=[
 {x:390,y:340,animal:"🐱",name:"Mimo",role:"Guardião curioso",q:"Qual é o número especial escondido por todo esse lugar?",answers:["8","oito"],reward:"Mimo parece satisfeito. Uma passagem perto do Lago dos Lírios se abriu. 🐱"},
 {x:1190,y:720,animal:"🦊",name:"Foxy",role:"Guardiã do outono",q:"Em que mês começou a nossa história? Pode responder com o número ou nome.",answers:["8","08","agosto"],reward:"Foxy balança a cauda. Uma porta antiga no Bosque de Outono se abriu. 🍂"},
 {x:1810,y:900,animal:"🐰",name:"Lumi",role:"Guardião das flores",q:"Qual flor aparece várias vezes pelo nosso jardim?",answers:["lirio","lírio","lirios","lírios"],reward:"Lumi pulou de felicidade. Um último segredo floresceu no mapa. 🌸"}
];
const SECRET_GATES=[[650,930,"Passagem dos Lírios"],[1510,430,"Atalho de Outono"],[1940,1260,"Cantinho Secreto"]];
const REGION_LABELS=[
 [260,120,"Jardim Azul"],[1120,120,"Bosque de Outono"],[1810,120,"Bosque das Teias"],
 [250,720,"Lago dos Lírios"],[1050,760,"Caminho das Memórias"],[1720,760,"Quadra da Memória"],
 [420,1330,"Campo dos Sonhos"],[1450,1320,"Estufa das Memórias"]
];
function blockedByTree(nx,ny){
 return trees.some(([tx,ty])=>Math.hypot(nx-tx,ny-(ty-18))<34);
}
function moveSafe(q,nx,ny){
 if(!blockedByTree(nx,q.y)) q.x=clamp(nx,25,WORLD.w-25);
 if(!blockedByTree(q.x,ny)) q.y=clamp(ny,25,WORLD.h-25);
}
export default function MiGardenGame(){
 const [stamina,setStamina]=useState(100),staminaRef=useRef(100);
 const [npcOpen,setNpcOpen]=useState(null),[answer,setAnswer]=useState(""),[catsSolved,setCatsSolved]=useState(()=>+localStorage.getItem("mi-v9-cats")||0),[secret,setSecret]=useState(()=>+localStorage.getItem("mi-v9-secret")||0);
 const [xp,setXp]=useState(()=>+localStorage.getItem("mi-v8-xp")||0),[toast,setToast]=useState(""),[quest,setQuest]=useState(0);
 const dash=useRef(0),shake=useRef(0),particles=useRef([]),invisible=useRef(0),eduSave=useRef(2),eduVisit=useRef({active:false,next:700,last:0}),checkpoint=useRef({x:180,y:1080}),anim=useRef({dir:"down",moving:false,step:0}),wind=useRef(0);
 const [joyUi,setJoyUi]=useState({show:false,x:0,y:0,kx:0,ky:0}),[started,setStarted]=useState(false),[eduGuard,setEduGuard]=useState(false),[eduLove,setEduLove]=useState(false),[items,setItems]=useState({cloak:1,shield:0}),[open,setOpen]=useState(false),[found,setFound]=useState(()=>+localStorage.getItem("mi-v4-f")||0),[mem,setMem]=useState(()=>+localStorage.getItem("mi-v4-m")||0),[lives,setLives]=useState(3),[msg,setMsg]=useState("Esse jardim parece ter perdido as cores. Talvez você consiga encontrá-las."),[near,setNear]=useState(false),[done,setDone]=useState(()=>localStorage.getItem("mi-v4-d")==="1");
 const cv=useRef(),p=useRef({x:180,y:1080}),keys=useRef({}),joy=useRef({x:0,y:0}),inv=useRef(0),life=useRef(3),sn=useRef(spiders.map((a,i)=>({x:a[0],y:a[1],homeX:a[0],homeY:a[1],min:a[2],max:a[3],v:i%2?1.25:1.05,alert:false}))),cat=useRef({x:220,y:1100}),raf=useRef(),catSave=useRef(true);
 useEffect(()=>{localStorage.setItem("mi-v4-f",found);localStorage.setItem("mi-v4-m",mem);localStorage.setItem("mi-v8-xp",xp);localStorage.setItem("mi-v9-cats",catsSolved);localStorage.setItem("mi-v9-secret",secret)},[found,mem,xp,catsSolved,secret]);
 useEffect(()=>{if(!toast)return;const t=setTimeout(()=>setToast(""),1700);return()=>clearTimeout(t)},[toast]);
 useEffect(()=>{if(!open)return;let c=cv.current,x=c.getContext("2d"),last=performance.now();const kd=e=>{keys.current[e.key.toLowerCase()]=1;if((e.key===" "||e.key.toLowerCase()==="e")&&dash.current<=0&&staminaRef.current>=22){dash.current=12;staminaRef.current-=22}},ku=e=>keys.current[e.key.toLowerCase()]=0;addEventListener("keydown",kd);addEventListener("keyup",ku);
 function loop(now){let dt=Math.min((now-last)/16.7,2);last=now;let q=p.current,dx=(keys.current.d||keys.current.arrowright?1:0)-(keys.current.a||keys.current.arrowleft?1:0)+joy.current.x,dy=(keys.current.s||keys.current.arrowdown?1:0)-(keys.current.w||keys.current.arrowup?1:0)+joy.current.y;const sprint=(keys.current.shift||keys.current["shift"])&&staminaRef.current>2;if(dash.current>0)dash.current-=dt;let speed=dash.current>0?10.5:(sprint?6.3:4);
 if(sprint&&dx||sprint&&dy){staminaRef.current=Math.max(0,staminaRef.current-.42*dt);setStamina(Math.round(staminaRef.current))}
 else if(staminaRef.current<100){staminaRef.current=Math.min(100,staminaRef.current+.18*dt);setStamina(Math.round(staminaRef.current))}
 anim.current.moving=!!(dx||dy);
 if(dx||dy){let l=Math.hypot(dx,dy);if(Math.abs(dx)>Math.abs(dy))anim.current.dir=dx>0?"right":"left";else anim.current.dir=dy>0?"down":"up";anim.current.step+=dt*(dash.current>0?1.1:sprint?.72:.48);moveSafe(q,q.x+dx/l*speed*dt,q.y+dy/l*speed*dt)}
 if(inv.current>0)inv.current-=dt;if(invisible.current>0)invisible.current-=dt;sn.current.forEach((z,i)=>{
   if(npcOpen||!started){z.alert=false;return}
   const d=Math.hypot(q.x-z.x,q.y-z.y); z.alert=d<(210+found*12);
   if(z.alert){const a=Math.atan2(q.y-z.y,q.x-z.x);z.x+=Math.cos(a)*(1.7+found*.08)*dt;z.y+=Math.sin(a)*(1.7+found*.08)*dt}
   else {const dh=Math.hypot(z.homeX-z.x,z.homeY-z.y);if(dh>5){const a=Math.atan2(z.homeY-z.y,z.homeX-z.x);z.x+=Math.cos(a)*.72*dt;z.y+=Math.sin(a)*.72*dt}}
   if(inv.current<=0&&invisible.current<=0&&d<34){
    if(life.current===1&&catSave.current){catSave.current=false;inv.current=110;z.x=z.homeX;z.y=z.homeY;setMsg("🐱 MIAU! O gatinho espantou a aranha. Ele decidiu que você ainda não podia perder. 🤍");}
    else if(items.shield>0){setItems(v=>({...v,shield:0}));inv.current=100;z.x=z.homeX;z.y=z.homeY;setToast("ESCUDO QUEBRADO 🛡️");setMsg("O escudo absorveu o ataque da aranha!")}
    else {let n=life.current-1;life.current=n;setLives(n);inv.current=80;shake.current=18;particles.current.push(...Array.from({length:7},(_,i)=>({x:q.x+(i-3)*4,y:q.y,life:35,e:"💥"})));
      const lostF=found,lostM=mem;setFound(0);setMem(0);setToast("A ARANHA ESPALHOU SEUS ITENS! 🕷️");q.x=checkpoint.current.x;q.y=checkpoint.current.y;
      if(n<=0){life.current=3;setLives(3);catSave.current=true;setMsg(`Você caiu na teia e os itens coletados (${lostF} fragmentos e ${lostM} memórias) voltaram ao mapa. Os segredos dos guardiões continuam salvos.`)}
      else setMsg(`A aranha pegou você! Os itens voltaram aos seus lugares. Ainda restam ${n} corações — mas os segredos dos guardiões ficam salvos.`)}
   }
  });
 if(started&&!npcOpen&&now>eduVisit.current.next&&!eduVisit.current.active){eduVisit.current.active=true;eduVisit.current.last=now;eduVisit.current.next=now+18000+Math.random()*18000;setEduLove(true);setTimeout(()=>{setEduLove(false);eduVisit.current.active=false},2600)}
 particles.current=particles.current.filter(pt=>{pt.life-=dt;pt.y-=.35*dt;return pt.life>0});
 if(shake.current>0)shake.current-=dt;
 let camX=clamp(q.x-c.width/2,0,WORLD.w-c.width),camY=clamp(q.y-c.height/2,0,WORLD.h-c.height);
 if(shake.current>0){camX+=Math.sin(now*.09)*5;camY+=Math.cos(now*.11)*4;}x.clearRect(0,0,c.width,c.height);wind.current=now*.00018;x.save();x.translate(-camX,-camY);
 let prog=found/8;x.fillStyle=`rgb(${220-35*prog},${224+22*prog},${218+20*prog})`;x.fillRect(0,0,WORLD.w,WORLD.h);
 // regions
 [[0,0,900,620,"rgba(100,116,139,.12)"],[900,0,900,620,"rgba(217,119,6,.12)"],[0,620,900,630,"rgba(59,130,246,.10)"],[900,620,900,630,"rgba(34,197,94,.09)"],[1800,0,400,760,"rgba(88,28,135,.13)"],[1350,1100,850,450,"rgba(15,23,42,.14)"]].forEach(a=>{x.fillStyle=a[4];x.fillRect(...a.slice(0,4))});
 // novas áreas
 x.font="bold 17px sans-serif";x.fillStyle="rgba(51,65,85,.78)";x.fillText("BOSQUE DE OUTONO",1830,95);x.fillText("ESTUFA DAS MEMÓRIAS",1690,1210);x.fillText("CAMPO DOS SONHOS",950,1450);
 // ruínas
 x.fillStyle="rgba(71,85,105,.45)";[[1880,250,90,18],[1980,330,120,18],[1620,1300,140,18],[760,1320,150,18]].forEach(a=>x.fillRect(...a));
 // flores e partículas decorativas
 x.font="18px serif";for(let i=0;i<35;i++)x.fillText(i%3?"✦":"🌸",100+(i*311)%2000,120+(i*197)%1300);
 // mundo começa frio e recupera saturação/luz conforme os fragmentos aparecem
 const veil=Math.max(0,.46-found*.055);x.fillStyle=`rgba(210,216,224,${veil})`;x.fillRect(0,0,WORLD.w,WORLD.h);
 // pontos-chave do parque: lago e quadra permanecem referências visuais
 x.fillStyle="rgba(255,255,255,.88)";x.font="bold 15px sans-serif";x.fillText("🌸 LAGO DOS LÍRIOS",250,700);x.fillText("🏐 QUADRA DA MEMÓRIA",1600,700);
 // paths, lake, volleyball
 x.fillStyle="rgba(250,235,205,.72)";x.fillRect(100,560,2000,110);x.fillRect(820,80,120,1380);x.fillRect(1450,980,620,100);
 // caminhos secundários deixam o mundo com leitura de mapa
 x.fillRect(180,220,650,72);x.fillRect(940,310,720,72);x.fillRect(1220,670,72,650);x.fillRect(260,1080,560,72);x.fillRect(1500,260,72,720);
 // placas e nomes de regiões
 REGION_LABELS.forEach(([rx,ry,label])=>{x.fillStyle="rgba(15,23,42,.68)";x.beginPath();x.roundRect(rx-92,ry-22,184,34,12);x.fill();x.fillStyle="rgba(255,255,255,.92)";x.font="bold 13px sans-serif";x.textAlign="center";x.fillText(label,rx,ry);x.textAlign="start"});
 // cercas decorativas
 x.strokeStyle="rgba(91,61,38,.55)";x.lineWidth=5;[[90,520,650,0],[980,520,650,0],[1320,1120,650,0]].forEach(([fx,fy,fw])=>{x.beginPath();x.moveTo(fx,fy);x.lineTo(fx+fw,fy);x.stroke()});
 // lago em camadas para dar profundidade
 x.fillStyle="rgba(20,80,125,.22)";x.beginPath();x.ellipse(485,806,265,154,0,0,Math.PI*2);x.fill();
 x.fillStyle="rgba(56,160,210,.62)";x.beginPath();x.ellipse(480,800,250,145,0,0,Math.PI*2);x.fill();
 x.strokeStyle="rgba(255,255,255,.35)";x.lineWidth=3;for(let i=0;i<5;i++){x.beginPath();x.arc(480,800,55+i*35,.15,2.7);x.stroke()}
 // pontes e lampiões
 x.fillStyle="#7c5a3a";x.fillRect(775,590,210,52);for(let i=0;i<7;i++){x.fillStyle=i%2?"#a77a4e":"#8b633f";x.fillRect(782+i*29,594,23,44)}
 [[770,575],[990,575],[760,680],[1000,680],[1230,535],[1530,535]].forEach(([lx,ly])=>{x.fillStyle="#4b3625";x.fillRect(lx,ly,7,30);x.fillStyle="rgba(255,190,70,.9)";x.beginPath();x.arc(lx+3,ly,7,0,7);x.fill()});
 // lírios no lago
 if(found>=2){x.font="25px serif";[[330,760],[430,720],[545,850],[610,785]].forEach(a=>x.fillText("🌸",a[0],a[1]))}
 x.strokeStyle="rgba(255,255,255,.75)";x.lineWidth=5;x.strokeRect(1320,120,330,210);x.beginPath();x.moveTo(1485,120);x.lineTo(1485,330);x.stroke();x.font="20px sans-serif";x.fillStyle="#475569";x.fillText("QUADRA DA MEMÓRIA",1360,105);
 // parque: vegetação, canteiros, bancos, pontes e iluminação
 const bushes=Array.from({length:34},(_,i)=>[120+(i*359)%1980,170+(i*227)%1250]);
 bushes.forEach(([bx,by],i)=>{x.fillStyle=i%4===0?"#789b63":"#5f8759";x.beginPath();x.arc(bx,by,10+(i%3)*3,0,7);x.arc(bx+13,by+3,8+(i%2)*3,0,7);x.fill();if(found>2&&i%5===0){x.font="12px serif";x.fillText("🌼",bx+4,by)}});
 [[430,520],[1080,520],[1590,1110],[370,1160],[1830,620]].forEach(([bx,by])=>{x.fillStyle="#7c5b42";x.fillRect(bx,by,38,8);x.fillRect(bx+4,by+8,4,12);x.fillRect(bx+30,by+8,4,12)});
 [[610,610],[1360,610],[910,1040]].forEach(([lx,ly])=>{x.strokeStyle="#475569";x.lineWidth=3;x.beginPath();x.moveTo(lx,ly);x.lineTo(lx,ly-27);x.stroke();x.fillStyle="rgba(253,230,138,.8)";x.beginPath();x.arc(lx,ly-31,7,0,7);x.fill()});
 // pontes de madeira como marcos visuais
 [[620,760,115,42],[1510,760,105,42]].forEach(([bx,by,bw,bh])=>{x.fillStyle="#9a7048";x.fillRect(bx,by,bw,bh);x.strokeStyle="#684b34";x.lineWidth=3;for(let j=5;j<bw;j+=15){x.beginPath();x.moveTo(bx+j,by);x.lineTo(bx+j,by+bh);x.stroke()}});
 trees.forEach(([a,b],i)=>{x.fillStyle="rgba(15,23,42,.16)";x.beginPath();x.ellipse(a+18,b+8,22,9,0,0,7);x.fill();x.fillStyle="#765136";x.fillRect(a+13,b-12,9,26);x.font=`${45+prog*8}px serif`;x.fillText(found>=2&&i%4===0?"🍂":"🌳",a-7,b);});
 // power-ups
 const powerups=[[760,410,"👻"],[1650,1180,"🛡️"]];
 powerups.forEach(([ix,iy,ic],i)=>{if((i===0&&items.cloak<2)||(i===1&&items.shield<1)){x.font="28px serif";x.fillText(ic,ix,iy);x.strokeStyle="rgba(96,165,250,.45)";x.beginPath();x.arc(ix+10,iy-10,22+Math.sin(now*.004)*3,0,7);x.stroke()}});
 // marcos/checkpoints
 [[180,1080],[840,610],[1510,620],[1120,1260]].forEach(([cx,cy],i)=>{x.font="29px serif";x.fillText("🏮",cx,cy);if(Math.hypot(q.x-cx,q.y-cy)<45){checkpoint.current={x:cx,y:cy}}});
 fragments.forEach((a,i)=>{if(i>=found){x.globalAlpha=i===found?1:.18;x.font=i===found?"36px serif":"23px serif";x.fillText(i===found?a[2]:"✦",a[0],a[1]);x.globalAlpha=1}});
 memories.forEach((a,i)=>{if(i>=mem){x.globalAlpha=i===mem?.9:.15;x.font="27px serif";x.fillText(a[2],a[0],a[1]);x.globalAlpha=1}});
 // teias marcam territórios das aranhas
 sn.current.forEach(z=>{x.globalAlpha=.38;x.strokeStyle="#e2e8f0";x.lineWidth=1.5;for(let rr=12;rr<=42;rr+=10){x.beginPath();x.arc(z.homeX,z.homeY,rr,0,Math.PI*2);x.stroke()}for(let a=0;a<6;a++){x.beginPath();x.moveTo(z.homeX,z.homeY);x.lineTo(z.homeX+Math.cos(a*Math.PI/3)*45,z.homeY+Math.sin(a*Math.PI/3)*45);x.stroke()}x.globalAlpha=1;
   if(z.alert){x.fillStyle="rgba(220,38,38,.12)";x.beginPath();x.arc(z.x,z.y,88,0,Math.PI*2);x.fill();x.strokeStyle="rgba(248,113,113,.28)";x.beginPath();x.arc(z.x,z.y,115,0,Math.PI*2);x.stroke()}
   x.font=z.alert?"38px serif":"33px serif";x.fillText("🕷️",z.x,z.y);
  });
 let ca=cat.current;ca.x+=(q.x+42-ca.x)*.025;ca.y+=(q.y+28-ca.y)*.025;x.font="31px serif";x.fillText("🐱",ca.x,ca.y);
 // folhas e vaga-lumes animados dão vida ao mapa sem assets pesados
 for(let i=0;i<18;i++){let fx=(i*317+(now*.018*(1+i%3)))%WORLD.w,fy=(i*191+(now*.012*(1+i%2)))%WORLD.h;x.globalAlpha=.22+.18*Math.sin(now*.002+i);x.font=i%3===0?"16px serif":"11px serif";x.fillText(i%3===0?"🍂":"✦",fx,fy);x.globalAlpha=1}
 CAT_NPCS.forEach((n,i)=>{const nb=Math.sin(now*.003+i*1.8)*3;x.globalAlpha=i<=catsSolved?1:.35;x.font="40px serif";x.fillText(n.animal,n.x,n.y+nb);x.globalAlpha=1;x.fillStyle="rgba(15,23,42,.68)";x.font="bold 10px sans-serif";x.fillText(n.name,n.x+3,n.y+17);if(i===catsSolved){x.fillStyle="rgba(255,255,255,.92)";x.beginPath();x.roundRect(n.x+23,n.y-49,74,26,9);x.fill();x.fillStyle="#334155";x.font="bold 10px sans-serif";x.fillText("fale comigo!",n.x+30,n.y-32)}});
 SECRET_GATES.forEach((g,i)=>{x.globalAlpha=i<catsSolved?1:.28;x.font="40px serif";x.fillText(i<catsSolved?"🚪":"🔒",g[0],g[1]);x.globalAlpha=1});
 // área secreta fica mais viva quando descoberta
 if(secret>0){x.fillStyle="rgba(244,114,182,.10)";x.beginPath();x.arc(2020,1360,150,0,7);x.fill();x.font="25px serif";["🌸","✨","💙","🌸","✨"].forEach((e,i)=>x.fillText(e,1930+i*42,1360+(i%2)*35));}
 particles.current.forEach(pt=>{x.globalAlpha=Math.min(1,pt.life/20);x.font="17px serif";x.fillText(pt.e,pt.x,pt.y);x.globalAlpha=1});
 // protagonista Mi — animação procedural leve para mobile
 const an=anim.current,bob=an.moving?Math.sin(an.step*5)*1.6:Math.sin(now*.003)*.6,walk=an.moving?Math.sin(an.step*5):0;
 x.save();x.translate(q.x,q.y+bob);if(an.dir==="left")x.scale(-1,1);x.globalAlpha=invisible.current>0?.28:inv.current>0&&Math.floor(inv.current/5)%2?.35:1;
 x.fillStyle="rgba(15,23,42,.22)";x.beginPath();x.ellipse(0,31-bob,19,7,0,0,7);x.fill();
 // pernas alternam durante caminhada
 x.fillStyle="#252a34";x.fillRect(-10,15+walk*2,8,15);x.fillRect(3,15-walk*2,8,15);x.fillStyle="#f8fafc";x.fillRect(-12,27+walk*2,10,5);x.fillRect(3,27-walk*2,10,5);
 // corpo inclina no dash
 if(dash.current>0)x.rotate(.08);
 x.fillStyle="#10141d";x.beginPath();x.roundRect(-15,-6,30,25,8);x.fill();x.fillStyle="#60a5fa";x.font="10px sans-serif";x.fillText("♥",-3,9);
 x.strokeStyle="#efc0a4";x.lineWidth=5;x.lineCap="round";x.beginPath();x.moveTo(-13,0);x.lineTo(-18,12-walk*3);x.moveTo(13,0);x.lineTo(18,12+walk*3);x.stroke();
 x.fillStyle="#efc1a6";x.beginPath();x.ellipse(0,-18,12,13,0,0,Math.PI*2);x.fill();
 // cachos reagem à caminhada/dash
 const sway=(an.moving?walk*1.3:Math.sin(now*.002)*.7)+(dash.current>0?3:0);
 x.fillStyle="#71361f";[[-15,-24],[-11,-31],[-4,-35],[4,-35],[11,-31],[16,-24],[-17,-15],[17,-15],[-18,-6],[18,-6],[-17,3],[17,3],[-15,11],[15,11]].forEach(([cx,cy],i)=>{x.beginPath();x.arc(cx+(cy>-10?sway*(cx<0?-1:1):0),cy,7.5,0,7);x.fill()});
 x.fillStyle="#a84f28";[[-12,-28],[-6,-33],[1,-34],[8,-31],[13,-25],[-15,-12],[15,-11],[-16,-2],[16,-1],[-13,8],[13,8]].forEach(([cx,cy])=>{x.beginPath();x.arc(cx+(cy>-8?sway*.5:0),cy,5.2,0,7);x.fill()});
 x.fillStyle="#d0783f";[[-8,-29],[3,-31],[11,-23],[-13,-8],[13,0],[-10,7]].forEach(([cx,cy])=>{x.beginPath();x.arc(cx,cy,2.2,0,7);x.fill()});
 // face muda conforme direção vertical
 if(an.dir!=="up"){x.strokeStyle="#7a493b";x.lineWidth=1;x.beginPath();x.moveTo(-7,-21);x.lineTo(-2,-22);x.moveTo(3,-22);x.lineTo(8,-21);x.stroke();x.fillStyle="#6b4b3e";x.beginPath();x.arc(-4,-18,1.5,0,7);x.arc(5,-18,1.5,0,7);x.fill();x.fillStyle="rgba(210,112,105,.28)";x.beginPath();x.arc(-8,-14,2.7,0,7);x.arc(8,-14,2.7,0,7);x.fill();x.strokeStyle="#b76868";x.beginPath();x.arc(1,-13,4,.25,2.7);x.stroke()}
 // rastro visual do dash
 if(dash.current>0){x.globalAlpha=.2;x.fillStyle="#93c5fd";x.beginPath();x.ellipse(-28,5,22,9,0,0,7);x.fill();x.globalAlpha=1}
 x.globalAlpha=1;x.restore();
 if(found>=8){x.font="72px serif";x.fillText("🌳",860,150);x.font="18px sans-serif";x.fillStyle="#334155";x.fillText("JARDIM CENTRAL",815,190)}
 if(done){x.font="34px serif";x.fillText("🧑🏻",930,205)}
 x.restore();
 let n=false;if(found<8){let a=fragments[found];n=Math.hypot(q.x-a[0],q.y-a[1])<65}else if(!done)n=Math.hypot(q.x-890,q.y-180)<100;if(mem<8){let a=memories[mem];if(Math.hypot(q.x-a[0],q.y-a[1])<55)n=true}if(catsSolved<CAT_NPCS.length){let cn=CAT_NPCS[catsSolved];if(Math.hypot(q.x-cn.x,q.y-cn.y)<70)n=true}
 if(catsSolved>secret&&secret<SECRET_GATES.length){let g=SECRET_GATES[secret];if(Math.hypot(q.x-g[0],q.y-g[1])<115)n=true}
 setNear(v=>v===n?v:n);raf.current=requestAnimationFrame(loop)}raf.current=requestAnimationFrame(loop);return()=>{cancelAnimationFrame(raf.current);removeEventListener("keydown",kd);removeEventListener("keyup",ku)}},[open,found,mem,done]);
 function act(){let q=p.current;
 if(Math.hypot(q.x-760,q.y-410)<105&&items.cloak<2){setItems(v=>({...v,cloak:v.cloak+1}));setToast("ITEM COLETADO: MANTO INVISÍVEL 👻");setMsg("Use o manto para ficar invisível às aranhas por 3 segundos.");return}
 if(Math.hypot(q.x-1650,q.y-1180)<105&&items.shield<1){setItems(v=>({...v,shield:1}));setToast("ITEM COLETADO: ESCUDO 💙");setMsg("Você encontrou uma proteção extra.");return}

 if(catsSolved<CAT_NPCS.length){let cn=CAT_NPCS[catsSolved];if(Math.hypot(q.x-cn.x,q.y-cn.y)<75){setNpcOpen(cn);setAnswer("");return}}
 if(catsSolved>secret&&secret<SECRET_GATES.length){let g=SECRET_GATES[secret];if(Math.hypot(q.x-g[0],q.y-g[1])<115){const dest=[[320,1320],[1780,250],[2040,1370]][secret];setSecret(v=>v+1);setXp(v=>v+50);setToast("PASSAGEM SECRETA ABERTA +50 XP 🔐");setMsg(`Você atravessou ${g[2]}. Existe algo diferente deste lado...`);q.x=dest[0];q.y=dest[1];checkpoint.current={x:q.x,y:q.y};return}}
if(mem<8){let a=memories[mem];if(Math.hypot(q.x-a[0],q.y-a[1])<60){setMem(v=>v+1);setXp(v=>v+15);setToast("+15 XP • MEMÓRIA ENCONTRADA 📷");particles.current.push(...Array.from({length:10},(_,i)=>({x:q.x+(i-5)*4,y:q.y,life:45,e:"✨"})));setMsg(`Memória ${mem+1}/8 encontrada. Algumas coisas merecem um lugar onde não possam se perder. 📷`);return}}if(found<8){let a=fragments[found];if(Math.hypot(q.x-a[0],q.y-a[1])<70){setFound(v=>v+1);setXp(v=>v+35);setQuest(v=>v+1);setToast("+35 XP • FRAGMENTO RECUPERADO ✨");particles.current.push(...Array.from({length:14},(_,i)=>({x:q.x+(i-7)*3,y:q.y,life:50,e:i%3?"✨":"🌸"})));setMsg(a[3]);return}}if(found>=8&&!done&&Math.hypot(q.x-890,q.y-180)<110){setDone(true);localStorage.setItem("mi-v4-d","1");unlockSecret("garden-complete");setMsg("No começo esse lugar estava quase vazio. Você encontrou as cores, as flores, as memórias e até aquele gato. Mas a parte que estava faltando era você. 🤍  22.08.2026")}}
 function useCloak(){if(items.cloak<=0||invisible.current>0)return;setItems(v=>({...v,cloak:v.cloak-1}));invisible.current=180;setToast("INVISÍVEL POR 3 SEGUNDOS 👻");setMsg("As aranhas não conseguem enxergar você agora!")}
 function submitAnswer(e){e.preventDefault();if(!npcOpen)return;const norm=v=>v.toLowerCase().trim().normalize("NFD").replace(/[\u0300-\u036f]/g,"");const ok=npcOpen.answers.map(norm).includes(norm(answer));if(ok){setCatsSolved(v=>v+1);setXp(v=>v+40);setToast("RESPOSTA CERTA +40 XP 🐱");setMsg(npcOpen.reward);setNpcOpen(null);setAnswer("")}else{setToast("Hmmm... tenta outra resposta 😼");}}
 function stick(e){let sx=e.clientX,sy=e.clientY;setJoyUi({show:true,x:sx,y:sy,kx:0,ky:0});let mv=ev=>{let dx=ev.clientX-sx,dy=ev.clientY-sy,d=Math.hypot(dx,dy)||1,m=Math.min(42,d);let nx=dx/d*m,ny=dy/d*m;joy.current={x:nx/42,y:ny/42};setJoyUi({show:true,x:sx,y:sy,kx:nx,ky:ny})};let end=()=>{joy.current={x:0,y:0};setJoyUi(v=>({...v,show:false}));removeEventListener("pointermove",mv);removeEventListener("pointerup",end);removeEventListener("pointercancel",end)};addEventListener("pointermove",mv);addEventListener("pointerup",end);addEventListener("pointercancel",end)}

 return <section id="jardim" className="bg-[#f6f9ff] px-4 py-16 sm:py-24"><div className="text-center"><button onClick={()=>setOpen(true)} className="rounded-[28px] border border-blue-100 bg-white px-7 py-5 shadow-lg"><b className="block text-xs uppercase tracking-[.2em] text-emerald-700">🌱 Jardim da Mi — A Jornada</b><span className="mt-2 block text-sm text-slate-500">um lugar ficou maior desde a última visita...</span></button></div>{open&&<div className="fixed inset-0 z-[100] overflow-y-auto bg-slate-950/90 p-2 sm:p-5"><div className="mx-auto max-w-5xl overflow-hidden rounded-[25px] bg-white"><header className="flex items-center justify-between p-3"><div><div className="flex flex-wrap items-center gap-2 text-[10px] font-black text-blue-950 sm:text-xs"><span>🌸 {found}/8</span><span>📷 {mem}/8</span><span>🐾 {catsSolved}/3</span><span>🔐 {secret}/3</span><span>🎨 {Math.round(found/8*100)}%</span><span>{"❤️".repeat(lives)}</span><span className="rounded-full bg-amber-100 px-2 py-1 text-amber-800">LV {1+Math.floor(xp/100)} • {xp} XP</span></div><p className="text-[10px] text-slate-500">Explore, converse com os guardiões e descubra caminhos escondidos. 🕷️ Aranhas ficam mais rápidas conforme você avança. SHIFT/CORRER ajuda a escapar. ESPAÇO/E ou DASH faz uma arrancada.</p></div><button onClick={()=>setOpen(false)} className="grid h-11 w-11 place-items-center rounded-full bg-slate-100"><X size={18}/></button></header><div className="relative bg-slate-900">
 <div className="pointer-events-none absolute left-3 top-3 z-20 w-28 rounded-xl bg-slate-950/55 p-2 text-[9px] font-bold text-white backdrop-blur"><div className="mb-1">ENERGIA {stamina}%</div><div className="h-1.5 overflow-hidden rounded-full bg-white/20"><div className="h-full bg-white transition-all" style={{width:`${stamina}%`}}/></div></div><div className="pointer-events-none absolute bottom-3 right-3 z-20 hidden h-24 w-36 overflow-hidden rounded-xl border border-white/30 bg-slate-950/55 p-2 text-[8px] text-white backdrop-blur sm:block"><b>MAPA</b><div className="relative mt-1 h-16 rounded bg-emerald-900/35"><span className="absolute left-[8%] top-[70%]">●</span><span className="absolute left-[40%] top-[35%]">🌸</span><span className="absolute right-[8%] top-[10%]">🕷️</span><span className="absolute right-[20%] bottom-[5%]">🔐</span></div></div>
 {toast&&<div className="pointer-events-none absolute left-1/2 top-16 z-30 -translate-x-1/2 rounded-full bg-slate-950/80 px-4 py-2 text-xs font-black text-white shadow-xl backdrop-blur">{toast}</div>}
 <div className="pointer-events-none absolute right-2 top-[5.6rem] z-20 max-w-[145px] sm:right-3 sm:top-14 sm:max-w-[180px] rounded-xl bg-slate-950/55 p-2 text-[9px] text-white backdrop-blur"><b>MISSÃO ATUAL</b><div className="mt-1 text-white/75">{found<8?`Recupere o fragmento ${found+1}/8 e explore as memórias.`:"Encontre o Jardim Central."}</div></div>
 {!started&&<div className="absolute inset-0 z-[120] grid place-items-center bg-gradient-to-b from-slate-950/85 to-blue-950/90 p-5 text-center backdrop-blur-sm"><div className="max-w-sm"><div className="text-5xl">🌸</div><h3 className="mt-3 text-2xl font-black text-white">O Jardim da Mi</h3><p className="mt-2 text-sm leading-6 text-blue-100">Recupere as cores, converse com os guardiões, encontre segredos e não deixe as aranhas levarem seus itens.</p><button onClick={()=>setStarted(true)} className="mt-6 min-h-14 w-full rounded-2xl bg-white px-6 font-black text-blue-900 shadow-2xl">COMEÇAR JORNADA ✨</button><p className="mt-3 text-[10px] text-white/60">No celular, toque e arraste em qualquer lugar livre para andar.</p></div></div>}
 {eduLove&&<div className="pointer-events-none absolute left-1/2 top-[42%] z-[105] -translate-x-1/2 animate-pulse rounded-3xl border border-blue-200/50 bg-slate-950/88 px-5 py-4 text-center text-white shadow-2xl backdrop-blur"><div className="text-4xl">🧑🏻‍💻💙</div><b className="mt-1 block text-sm">Edu apareceu por aqui...</b><span className="block text-xs text-blue-100">eu te amo 🤍</span></div>}
 {eduGuard&&<div className="pointer-events-none absolute inset-x-3 top-1/3 z-[110] mx-auto max-w-xs rounded-3xl border border-blue-200/50 bg-slate-950/90 p-4 text-center text-white shadow-2xl backdrop-blur"><div className="text-4xl">🧑🏻‍💻💙</div><b className="mt-2 block text-sm">PROTEGIDA PELO EDU</b><span className="mt-1 block text-xs text-blue-100">Continue sua jornada. Eu cuido dessa aranha. 😼</span></div>}
 <div className="absolute bottom-3 left-3 z-40 flex gap-2 sm:bottom-4"><button onClick={useCloak} disabled={!items.cloak||invisible.current>0} className="min-h-11 rounded-xl border border-white/50 bg-slate-950/55 px-3 text-[10px] font-black text-white shadow-lg disabled:opacity-35">👻 {items.cloak}</button><div className="grid min-h-11 place-items-center rounded-xl border border-white/40 bg-slate-950/45 px-3 text-[10px] font-black text-white">🛡️ {items.shield}</div></div>
 <div className="pointer-events-none absolute left-1/2 top-[5.7rem] z-20 -translate-x-1/2 rounded-full border border-white/30 bg-slate-950/45 px-3 py-1 text-[9px] font-black tracking-wide text-white backdrop-blur sm:top-16">✦ EXPLORE • DESCUBRA • SOBREVIVA</div>
 <canvas ref={cv} width="900" height="570" className="block h-[64svh] min-h-[420px] max-h-[620px] w-full touch-none object-cover sm:h-auto sm:min-h-0"/>{near&&<button onClick={act} className="absolute bottom-24 right-3 z-40 min-h-12 rounded-2xl border border-white/60 bg-white/95 px-4 py-3 text-xs font-black text-blue-900 shadow-2xl backdrop-blur sm:bottom-4 sm:right-4 sm:text-sm">PEGAR / INTERAGIR ✨</button>}<button onPointerDown={()=>{if(dash.current<=0&&staminaRef.current>=22){dash.current=12;staminaRef.current-=22}}} className="absolute bottom-[5.25rem] right-3 z-30 grid h-14 w-14 place-items-center rounded-full border border-white/50 bg-blue-500/60 text-[9px] font-black text-white shadow-lg sm:hidden">DASH ✦</button><button onPointerDown={()=>keys.current.shift=1} onPointerUp={()=>keys.current.shift=0} onPointerCancel={()=>keys.current.shift=0} className="absolute bottom-3 right-3 z-30 grid h-16 w-16 place-items-center rounded-full border border-white/50 bg-white/25 text-[10px] font-black text-white sm:hidden">CORRER</button><div onPointerDown={stick} className="absolute inset-0 z-20 touch-none sm:hidden"></div>{joyUi.show&&<div className="pointer-events-none fixed z-[150] h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white/60 bg-slate-900/25 shadow-xl backdrop-blur-sm sm:hidden" style={{left:joyUi.x,top:joyUi.y}}><div className="absolute left-1/2 top-1/2 h-10 w-10 rounded-full border border-white/70 bg-white/70 shadow" style={{transform:`translate(calc(-50% + ${joyUi.kx}px), calc(-50% + ${joyUi.ky}px))`}}></div></div>}</div><div className="min-h-[82px] p-4 text-sm leading-6 text-slate-700">{msg}</div></div></div>}
 {npcOpen&&<div className="fixed inset-0 z-[130] grid place-items-center bg-slate-950/75 p-4 backdrop-blur-sm"><form onSubmit={submitAnswer} className="w-full max-w-sm rounded-[28px] bg-white p-5 shadow-2xl sm:p-6"><div className="text-5xl">{npcOpen.animal}</div><p className="mt-4 text-[10px] font-black uppercase tracking-[.2em] text-blue-700">{npcOpen.name} • {npcOpen.role}</p><h3 className="mt-2 text-xl font-bold leading-7 text-slate-900">{npcOpen.q}</h3><input autoFocus value={answer} onChange={e=>setAnswer(e.target.value)} placeholder="Escreva sua resposta..." className="mt-5 h-12 w-full rounded-2xl border border-slate-200 px-4 text-base outline-none focus:border-blue-400"/><div className="mt-4 flex gap-2"><button type="button" onClick={()=>setNpcOpen(null)} className="h-12 flex-1 rounded-2xl bg-slate-100 text-sm font-bold text-slate-600">depois</button><button type="submit" className="h-12 flex-1 rounded-2xl bg-blue-700 text-sm font-black text-white">responder ✨</button></div></form></div>}
 </section>
}
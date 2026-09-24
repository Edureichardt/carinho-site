import { useEffect,useRef,useState } from "react";
import { X } from "lucide-react";
import { unlockSecret } from "../secretSystem";
const WORLD={w:2700,h:1850}, clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
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
const spiders=[[500,320,280,740],[1150,560,1010,1390],[700,850,560,900],[1430,690,1290,1600],[1850,420,1700,2050],[1750,1050,1580,2040],[1100,1280,930,1330],[2320,430,2180,2550],[2390,1420,2200,2580]];
const dogs=[[2250,900],[520,1570]];
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
 [420,1330,"Campo dos Sonhos"],[1450,1320,"Estufa das Memórias"],[2250,500,"Parque das Lanternas"],[2280,1450,"Bosque Escondido"]
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
 const dash=useRef(0),shake=useRef(0),particles=useRef([]),invisible=useRef(0),eduSave=useRef(2),eduVisit=useRef({active:false,next:2400,last:0}),dogsRef=useRef(dogs.map(([x,y])=>({x,y,hx:x,hy:y}))),eduShot=useRef(0),swordAnim=useRef(0),arrowsFx=useRef([]),centralFx=useRef(0),arrowLootRef=useRef([1,1,1,1]),dogTrap=useRef({active:false,dog:null,cool:0}),checkpoint=useRef({x:180,y:1080}),anim=useRef({dir:"down",moving:false,step:0}),wind=useRef(0);
 const [joyUi,setJoyUi]=useState({show:false,x:0,y:0,kx:0,ky:0}),[started,setStarted]=useState(false),[eduGuard,setEduGuard]=useState(false),[eduLove,setEduLove]=useState(false),[secretScene,setSecretScene]=useState(null),
 [companion,setCompanion]=useState(()=>localStorage.getItem("mi-v16-companion")||"cat"),
 [bow,setBow]=useState(()=>localStorage.getItem("mi-v16-bow")==="1"),
 [arrows,setArrows]=useState(()=>+(localStorage.getItem("mi-v16-arrows")||0)),
 [charm,setCharm]=useState(()=>localStorage.getItem("mi-v16-charm")==="1"),
 [boots,setBoots]=useState(()=>localStorage.getItem("mi-v17-boots")==="1"),
 [maxLives,setMaxLives]=useState(()=>+(localStorage.getItem("mi-v17-maxLives")||3)),
 [houseOpen,setHouseOpen]=useState(false),
 [houseItems,setHouseItems]=useState(()=>JSON.parse(localStorage.getItem("mi-v17-house")||'{"bed":false,"chest":false,"lamp":false,"bench":false}')),
 [furnitureBag,setFurnitureBag]=useState(()=>JSON.parse(localStorage.getItem("mi-v18-furniture")||'{"bed":false,"chest":false,"lamp":false,"bench":false}')),
 [stash,setStash]=useState(()=>+(localStorage.getItem("mi-v18-stash")||0)),
 [swordLevel,setSwordLevel]=useState(()=>+(localStorage.getItem("mi-v18-sword")||1)),
 [bossOpen,setBossOpen]=useState(false),[bossHp,setBossHp]=useState(9),[ending,setEnding]=useState(false),
 [items,setItems]=useState({cloak:0,shield:0,sword:0}),[open,setOpen]=useState(false),[found,setFound]=useState(()=>+localStorage.getItem("mi-v4-f")||0),[mem,setMem]=useState(()=>+localStorage.getItem("mi-v4-m")||0),[lives,setLives]=useState(3),[msg,setMsg]=useState("Esse jardim parece ter perdido as cores. Talvez você consiga encontrá-las."),[near,setNear]=useState(false),[done,setDone]=useState(()=>localStorage.getItem("mi-v4-d")==="1");
 const cv=useRef(),p=useRef({x:180,y:1080}),keys=useRef({}),joy=useRef({x:0,y:0}),inv=useRef(0),life=useRef(3),sn=useRef(spiders.map((a,i)=>({x:a[0],y:a[1],homeX:a[0],homeY:a[1],min:a[2],max:a[3],v:i%2?1.25:1.05,alert:false,slow:0,hp:3,stun:0}))),cat=useRef({x:220,y:1100}),raf=useRef(),catSave=useRef(true);
 useEffect(()=>{localStorage.setItem("mi-v4-f",found);localStorage.setItem("mi-v4-m",mem);localStorage.setItem("mi-v8-xp",xp);localStorage.setItem("mi-v9-cats",catsSolved);localStorage.setItem("mi-v9-secret",secret)},[found,mem,xp,catsSolved,secret]);
 useEffect(()=>{localStorage.setItem("mi-v16-companion",companion);localStorage.setItem("mi-v16-bow",bow?"1":"0");localStorage.setItem("mi-v16-arrows",String(arrows));localStorage.setItem("mi-v16-charm",charm?"1":"0")},[companion,bow,arrows,charm]);
 useEffect(()=>{localStorage.setItem("mi-v17-boots",boots?"1":"0");localStorage.setItem("mi-v17-maxLives",String(maxLives));localStorage.setItem("mi-v17-house",JSON.stringify(houseItems));localStorage.setItem("mi-v18-furniture",JSON.stringify(furnitureBag));localStorage.setItem("mi-v18-stash",String(stash));localStorage.setItem("mi-v18-sword",String(swordLevel))},[boots,maxLives,houseItems,furnitureBag,stash,swordLevel]);
 useEffect(()=>{if(!toast)return;const t=setTimeout(()=>setToast(""),1700);return()=>clearTimeout(t)},[toast]);
 useEffect(()=>{if(!open)return;let c=cv.current,x=c.getContext("2d"),last=performance.now();const kd=e=>{keys.current[e.key.toLowerCase()]=1;if((e.key===" "||e.key.toLowerCase()==="e")&&dash.current<=0&&staminaRef.current>=22){dash.current=12;staminaRef.current-=22}},ku=e=>keys.current[e.key.toLowerCase()]=0;addEventListener("keydown",kd);addEventListener("keyup",ku);
 function loop(now){let dt=Math.min((now-last)/16.7,2);last=now;let q=p.current,dx=(keys.current.d||keys.current.arrowright?1:0)-(keys.current.a||keys.current.arrowleft?1:0)+joy.current.x,dy=(keys.current.s||keys.current.arrowdown?1:0)-(keys.current.w||keys.current.arrowup?1:0)+joy.current.y;const sprint=(keys.current.shift||keys.current["shift"])&&staminaRef.current>2;if(dash.current>0)dash.current-=dt;if(swordAnim.current>0)swordAnim.current-=dt;let speed=(dash.current>0?10.5:(sprint?6.3:4))*(boots?1.22:1)*(dogTrap.current.active?.48:1);
 if(sprint&&dx||sprint&&dy){staminaRef.current=Math.max(0,staminaRef.current-.42*dt);setStamina(Math.round(staminaRef.current))}
 else if(staminaRef.current<100){staminaRef.current=Math.min(100,staminaRef.current+.18*dt);setStamina(Math.round(staminaRef.current))}
 anim.current.moving=!!(dx||dy);
 if(dx||dy){let l=Math.hypot(dx,dy);if(Math.abs(dx)>Math.abs(dy))anim.current.dir=dx>0?"right":"left";else anim.current.dir=dy>0?"down":"up";anim.current.step+=dt*(dash.current>0?1.1:sprint?.72:.48);moveSafe(q,q.x+dx/l*speed*dt,q.y+dy/l*speed*dt)}
 if(inv.current>0)inv.current-=dt;if(invisible.current>0)invisible.current-=dt;
 // loot espalhado pelo parque
 const arrowLoot=[[420,1480],[1320,330],[2110,760],[2510,1320]];
 const furnitureLoot=[["bed",2440,250,"🛏️"],["chest",1850,1510,"🧰"],["lamp",980,1650,"🏮"],["bench",2580,1120,"🛠️"]];
 
 arrowLoot.forEach(([ax,ay],i)=>{if(bow&&arrowLootRef.current[i]&&Math.hypot(q.x-ax,q.y-ay)<38&&arrows<8){arrowLootRef.current[i]=0;setArrows(v=>Math.min(8,v+1));setToast("FLECHA ENCONTRADA +1 🏹")}})
 if(!boots&&Math.hypot(q.x-2260,q.y-1620)<42){setBoots(true);setToast("BOTAS DO VENTO EQUIPADAS 👟");setMsg("Sua corrida ficou mais rápida.")}
 if(maxLives===3&&Math.hypot(q.x-2580,q.y-520)<42){setMaxLives(4);life.current=4;setLives(4);setToast("LÍRIO DA VIDA — 4 CORAÇÕES 🌸");setMsg("O Lírio da Vida aumentou sua energia máxima.")}
 // móveis colecionáveis para a casa
 [["bed",2440,250,"🛏️"],["chest",1850,1510,"🧰"],["lamp",980,1650,"🏮"],["bench",2580,1120,"🛠️"]].forEach(([key,fx,fy,icon])=>{if(!furnitureBag[key]&&!houseItems[key]){x.font="28px serif";x.fillText(icon,fx,fy);x.strokeStyle="rgba(251,191,36,.45)";x.beginPath();x.arc(fx+9,fy-10,22,0,7);x.stroke()}});
 // loot e casa segura
 if(bow){[[420,1480],[1320,330],[2110,760],[2510,1320]].forEach(([ax,ay],i)=>{if(arrowLootRef.current[i]){x.font="20px serif";x.fillText("🏹",ax,ay)}})}
 if(!boots){x.font="27px serif";x.fillText("👟",2260,1620)}
 if(maxLives===3){x.font="29px serif";x.fillText("🌸",2580,520)}
 x.fillStyle="#8b5e3c";x.fillRect(2050,1530,150,105);x.fillStyle="#5b3827";x.beginPath();x.moveTo(2030,1530);x.lineTo(2125,1460);x.lineTo(2220,1530);x.fill();x.fillStyle="#fde68a";x.fillRect(2110,1580,32,55);x.font="12px sans-serif";x.fillStyle="#fff";x.fillText("CASA SEGURA",2074,1652);
 // power-ups são coletados e ativados automaticamente ao passar por cima
 if(items.cloak===0&&Math.hypot(q.x-760,q.y-410)<42){setItems(v=>({...v,cloak:-1}));invisible.current=180;setToast("MANTO ATIVADO — 3s INVISÍVEL 👻");setMsg("Você ficou invisível. Passe pelas aranhas agora!")}
 if(items.shield===0&&Math.hypot(q.x-1650,q.y-1180)<42){setItems(v=>({...v,shield:1}));setToast("ESCUDO EQUIPADO 🛡️");setMsg("O próximo ataque será bloqueado.")}
 
 sn.current.forEach((z,i)=>{
   if(z.stun>0){z.stun-=dt;z.alert=false;return}
   if(npcOpen||!started){z.alert=false;return}
   const d=Math.hypot(q.x-z.x,q.y-z.y);
   z.alert=d<(210+found*12);
   if(z.alert){const a=Math.atan2(q.y-z.y,q.x-z.x);z.x+=Math.cos(a)*(1.7+found*.08)*dt;z.y+=Math.sin(a)*(1.7+found*.08)*dt}
   else {const dh=Math.hypot(z.homeX-z.x,z.homeY-z.y);if(dh>5){const a=Math.atan2(z.homeY-z.y,z.homeX-z.x);z.x+=Math.cos(a)*.72*dt;z.y+=Math.sin(a)*.72*dt}}
   if(inv.current<=0&&invisible.current<=0&&d<34){
    if(companion==="cat"&&life.current===1&&catSave.current){catSave.current=false;inv.current=110;z.x=z.homeX;z.y=z.homeY;setMsg("🐱 MIAU! O gatinho espantou a aranha. Ele decidiu que você ainda não podia perder. 🤍");}
    else if(items.shield>0){setItems(v=>({...v,shield:0}));inv.current=100;z.x=z.homeX;z.y=z.homeY;setToast("ESCUDO QUEBRADO 🛡️");setMsg("O escudo absorveu o ataque da aranha!")}
    else {let n=life.current-1;life.current=n;setLives(n);inv.current=80;shake.current=18;particles.current.push(...Array.from({length:7},(_,i)=>({x:q.x+(i-3)*4,y:q.y,life:35,e:"💥"})));
      q.x=checkpoint.current.x;q.y=checkpoint.current.y;
      if(n<=0){const lostF=found,lostM=mem;setFound(0);setMem(0);life.current=maxLives;setLives(maxLives);catSave.current=true;setToast("3 CORAÇÕES PERDIDOS — ITENS ESPALHADOS 🕷️");setMsg(`Você perdeu os 3 corações. Os itens coletados (${lostF} fragmentos e ${lostM} memórias) voltaram ao mapa. Os segredos continuam salvos.`)}
      else setMsg(`A aranha acertou você. Ainda restam ${n} corações — e seus itens continuam com você.`)}
   }
  });
 if(started&&!npcOpen&&now>eduVisit.current.next&&!eduVisit.current.active){eduVisit.current.active=true;eduVisit.current.last=now;eduVisit.current.next=now+55000+Math.random()*35000;setEduLove(true);setTimeout(()=>{setEduLove(false);eduVisit.current.active=false},2600)}
 if(companion==="edu"&&bow&&arrows>0&&!npcOpen&&!secretScene&&now-eduShot.current>6000){let best=null,bd=430;sn.current.forEach(z=>{let d=Math.hypot(cat.current.x-z.x,cat.current.y-z.y);if(z.stun<=0&&d<bd){best=z;bd=d}});if(best){let a=Math.atan2(best.y-cat.current.y,best.x-cat.current.x);arrowsFx.current.push({x:cat.current.x,y:cat.current.y-12,vx:Math.cos(a)*11,vy:Math.sin(a)*11,life:55,hit:false});setArrows(v=>Math.max(0,v-1));eduShot.current=now;setToast("EDU DISPAROU 🏹")}}
 if(started&&!npcOpen&&!secretScene){dogsRef.current.forEach(dg=>{let target=cat.current,dd=Math.hypot(target.x-dg.x,target.y-dg.y);if(dogTrap.current.cool>0)dogTrap.current.cool-=dt;if(companion==="cat"&&dd<330&&dogTrap.current.cool<=0){let a=Math.atan2(target.y-dg.y,target.x-dg.x);dg.x+=Math.cos(a)*.55*dt;dg.y+=Math.sin(a)*.55*dt;if(dd<32&&!dogTrap.current.active){dogTrap.current={active:true,dog:dg,cool:0};setToast("O CACHORRO PEGOU O GATINHO! 🐕🐱");setMsg("Você ficou mais lenta. Vá até eles e use SOLTAR GATINHO.")}}else{let dh=Math.hypot(dg.hx-dg.x,dg.hy-dg.y);if(dh>5){let a=Math.atan2(dg.hy-dg.y,dg.hx-dg.x);dg.x+=Math.cos(a)*.25*dt;dg.y+=Math.sin(a)*.25*dt}}})}
 arrowsFx.current=arrowsFx.current.filter(a=>{a.x+=a.vx*dt;a.y+=a.vy*dt;a.life-=dt;sn.current.forEach(z=>{if(!a.hit&&Math.hypot(a.x-z.x,a.y-z.y)<28){a.hit=true;z.slow=300;z.hp=Math.max(1,(z.hp??3)-1);particles.current.push({x:z.x,y:z.y,life:28,e:"💫"})}});return a.life>0&&!a.hit});
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
 const bushes=Array.from({length:62},(_,i)=>[120+(i*359)%1980,170+(i*227)%1250]);
 bushes.forEach(([bx,by],i)=>{x.fillStyle=i%4===0?"#789b63":"#5f8759";x.beginPath();x.arc(bx,by,10+(i%3)*3,0,7);x.arc(bx+13,by+3,8+(i%2)*3,0,7);x.fill();if(found>2&&i%5===0){x.font="12px serif";x.fillText("🌼",bx+4,by)}});
 [[430,520],[1080,520],[1590,1110],[370,1160],[1830,620]].forEach(([bx,by])=>{x.fillStyle="#7c5b42";x.fillRect(bx,by,38,8);x.fillRect(bx+4,by+8,4,12);x.fillRect(bx+30,by+8,4,12)});
 [[610,610],[1360,610],[910,1040]].forEach(([lx,ly])=>{x.strokeStyle="#475569";x.lineWidth=3;x.beginPath();x.moveTo(lx,ly);x.lineTo(lx,ly-27);x.stroke();x.fillStyle="rgba(253,230,138,.8)";x.beginPath();x.arc(lx,ly-31,7,0,7);x.fill()});
 // pontes de madeira como marcos visuais
 [[620,760,115,42],[1510,760,105,42]].forEach(([bx,by,bw,bh])=>{x.fillStyle="#9a7048";x.fillRect(bx,by,bw,bh);x.strokeStyle="#684b34";x.lineWidth=3;for(let j=5;j<bw;j+=15){x.beginPath();x.moveTo(bx+j,by);x.lineTo(bx+j,by+bh);x.stroke()}});
 trees.forEach(([a,b],i)=>{x.fillStyle="rgba(15,23,42,.16)";x.beginPath();x.ellipse(a+18,b+8,22,9,0,0,7);x.fill();x.fillStyle="#765136";x.fillRect(a+13,b-12,9,26);x.font=`${45+prog*8}px serif`;x.fillText(found>=2&&i%4===0?"🍂":"🌳",a-7,b);});
 // móveis colecionáveis para a casa
 [["bed",2440,250,"🛏️"],["chest",1850,1510,"🧰"],["lamp",980,1650,"🏮"],["bench",2580,1120,"🛠️"]].forEach(([key,fx,fy,icon])=>{if(!furnitureBag[key]&&!houseItems[key]){x.font="28px serif";x.fillText(icon,fx,fy);x.strokeStyle="rgba(251,191,36,.45)";x.beginPath();x.arc(fx+9,fy-10,22,0,7);x.stroke()}});
 // loot e casa segura
 if(bow){[[420,1480],[1320,330],[2110,760],[2510,1320]].forEach(([ax,ay],i)=>{if(arrowLootRef.current[i]){x.font="20px serif";x.fillText("🏹",ax,ay)}})}
 if(!boots){x.font="27px serif";x.fillText("👟",2260,1620)}
 if(maxLives===3){x.font="29px serif";x.fillText("🌸",2580,520)}
 x.fillStyle="#8b5e3c";x.fillRect(2050,1530,150,105);x.fillStyle="#5b3827";x.beginPath();x.moveTo(2030,1530);x.lineTo(2125,1460);x.lineTo(2220,1530);x.fill();x.fillStyle="#fde68a";x.fillRect(2110,1580,32,55);x.font="12px sans-serif";x.fillStyle="#fff";x.fillText("CASA SEGURA",2074,1652);
 // power-ups
 const powerups=[[760,410,"👻"],[1650,1180,"🛡️"],[2380,1510,"⚔️"]];
 powerups.forEach(([ix,iy,ic],i)=>{if((i===0&&items.cloak===0)||(i===1&&items.shield===0)||(i===2&&items.sword===0)){x.font="28px serif";x.fillText(ic,ix,iy);x.strokeStyle="rgba(96,165,250,.45)";x.beginPath();x.arc(ix+10,iy-10,22+Math.sin(now*.004)*3,0,7);x.stroke()}});
 // marcos/checkpoints
 [[180,1080],[840,610],[1510,620],[1120,1260]].forEach(([cx,cy],i)=>{x.font="29px serif";x.fillText("🏮",cx,cy);if(Math.hypot(q.x-cx,q.y-cy)<45){checkpoint.current={x:cx,y:cy}}});
 fragments.forEach((a,i)=>{if(i>=found){x.globalAlpha=i===found?1:.18;x.font=i===found?"36px serif":"23px serif";x.fillText(i===found?a[2]:"✦",a[0],a[1]);x.globalAlpha=1}});
 memories.forEach((a,i)=>{if(i>=mem){x.globalAlpha=i===mem?.9:.15;x.font="27px serif";x.fillText(a[2],a[0],a[1]);x.globalAlpha=1}});
 dogsRef.current.forEach(dg=>{x.font="30px serif";x.fillText("🐕",dg.x,dg.y);x.fillStyle="rgba(15,23,42,.65)";x.font="9px sans-serif";x.fillText("segue o gatinho",dg.x-8,dg.y+15)});
 // teias marcam territórios das aranhas
 sn.current.forEach(z=>{x.globalAlpha=.38;x.strokeStyle="#e2e8f0";x.lineWidth=1.5;for(let rr=12;rr<=42;rr+=10){x.beginPath();x.arc(z.homeX,z.homeY,rr,0,Math.PI*2);x.stroke()}for(let a=0;a<6;a++){x.beginPath();x.moveTo(z.homeX,z.homeY);x.lineTo(z.homeX+Math.cos(a*Math.PI/3)*45,z.homeY+Math.sin(a*Math.PI/3)*45);x.stroke()}x.globalAlpha=1;
   if(z.alert){x.fillStyle="rgba(220,38,38,.12)";x.beginPath();x.arc(z.x,z.y,88,0,Math.PI*2);x.fill();x.strokeStyle="rgba(248,113,113,.28)";x.beginPath();x.arc(z.x,z.y,115,0,Math.PI*2);x.stroke()}
   x.font=z.alert?"38px serif":"33px serif";x.fillText("🕷️",z.x,z.y);
  });
 let ca=cat.current;ca.x+=(q.x+42-ca.x)*.025;ca.y+=(q.y+28-ca.y)*.025;
 if(companion==="cat"){x.font="31px serif";x.fillText("🐱",ca.x,ca.y)}
 else {const eb=Math.sin(now*.006)*1.2;x.save();x.translate(ca.x,ca.y+eb);x.fillStyle="rgba(15,23,42,.18)";x.beginPath();x.ellipse(0,18,14,5,0,0,7);x.fill();x.fillStyle="#172033";x.fillRect(-9,-2,18,20);x.fillStyle="#2563eb";x.fillRect(-9,11,18,3);x.fillStyle="#e8b899";x.beginPath();x.arc(0,-12,9,0,7);x.fill();x.fillStyle="#3b241b";x.beginPath();x.arc(0,-17,9,Math.PI,7);x.fill();x.fillRect(-8,-18,16,5);x.fillStyle="#334155";x.fillRect(-8,18,6,12);x.fillRect(3,18,6,12);x.fillStyle="#f8fafc";x.fillRect(-9,28,8,4);x.fillRect(3,28,8,4);x.strokeStyle="#a16207";x.lineWidth=2;x.beginPath();x.arc(12,1,10,-1.2,1.2);x.stroke();x.strokeStyle="#e2e8f0";x.beginPath();x.moveTo(12,-8);x.lineTo(12,10);x.stroke();x.fillStyle="#60a5fa";x.font="9px sans-serif";x.fillText("♥",-3,9);x.restore();x.font="bold 9px sans-serif";x.fillStyle="rgba(15,23,42,.8)";x.fillText("Edu • arqueiro",ca.x-26,ca.y+43)}
 // folhas e vaga-lumes animados dão vida ao mapa sem assets pesados
 for(let i=0;i<18;i++){let fx=(i*317+(now*.018*(1+i%3)))%WORLD.w,fy=(i*191+(now*.012*(1+i%2)))%WORLD.h;x.globalAlpha=.22+.18*Math.sin(now*.002+i);x.font=i%3===0?"16px serif":"11px serif";x.fillText(i%3===0?"🍂":"✦",fx,fy);x.globalAlpha=1}
 CAT_NPCS.forEach((n,i)=>{const nb=Math.sin(now*.003+i*1.8)*3;x.globalAlpha=i<=catsSolved?1:.35;x.font="40px serif";x.fillText(n.animal,n.x,n.y+nb);x.globalAlpha=1;x.fillStyle="rgba(15,23,42,.68)";x.font="bold 10px sans-serif";x.fillText(n.name,n.x+3,n.y+17);if(i===catsSolved){x.fillStyle="rgba(255,255,255,.92)";x.beginPath();x.roundRect(n.x+23,n.y-49,74,26,9);x.fill();x.fillStyle="#334155";x.font="bold 10px sans-serif";x.fillText("fale comigo!",n.x+30,n.y-32)}});
 SECRET_GATES.forEach((g,i)=>{x.globalAlpha=i<catsSolved?1:.28;x.font="40px serif";x.fillText(i<catsSolved?"🚪":"🔒",g[0],g[1]);x.globalAlpha=1});
 // área secreta fica mais viva quando descoberta
 if(secret>0){x.fillStyle="rgba(244,114,182,.10)";x.beginPath();x.arc(2020,1360,150,0,7);x.fill();x.font="25px serif";["🌸","✨","💙","🌸","✨"].forEach((e,i)=>x.fillText(e,1930+i*42,1360+(i%2)*35));}
 particles.current.forEach(pt=>{x.globalAlpha=Math.min(1,pt.life/20);x.font="17px serif";x.fillText(pt.e,pt.x,pt.y);x.globalAlpha=1});
 arrowsFx.current.forEach(a=>{x.save();x.translate(a.x,a.y);x.rotate(Math.atan2(a.vy,a.vx));x.strokeStyle="#f8fafc";x.lineWidth=3;x.beginPath();x.moveTo(-10,0);x.lineTo(10,0);x.stroke();x.fillStyle="#93c5fd";x.beginPath();x.moveTo(11,0);x.lineTo(4,-5);x.lineTo(4,5);x.fill();x.restore()});
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
 if(items.sword>0){const swing=swordAnim.current>0?Math.sin((1-swordAnim.current/18)*Math.PI)*1.25:0;x.save();x.translate(15,3);x.rotate(-.65+swing);x.strokeStyle="#dbeafe";x.shadowColor="#93c5fd";x.shadowBlur=swordAnim.current>0?12:3;x.lineWidth=4;x.beginPath();x.moveTo(0,0);x.lineTo(22,-17);x.stroke();x.shadowBlur=0;x.fillStyle="#fbbf24";x.fillRect(-3,-2,10,3);x.restore();if(swordAnim.current>0){x.strokeStyle="rgba(219,234,254,.65)";x.lineWidth=3;x.beginPath();x.arc(12,-1,31,-1.4,.5);x.stroke()}}
 // face muda conforme direção vertical
 if(an.dir!=="up"){x.strokeStyle="#7a493b";x.lineWidth=1;x.beginPath();x.moveTo(-7,-21);x.lineTo(-2,-22);x.moveTo(3,-22);x.lineTo(8,-21);x.stroke();x.fillStyle="#6b4b3e";x.beginPath();x.arc(-4,-18,1.5,0,7);x.arc(5,-18,1.5,0,7);x.fill();x.fillStyle="rgba(210,112,105,.28)";x.beginPath();x.arc(-8,-14,2.7,0,7);x.arc(8,-14,2.7,0,7);x.fill();x.strokeStyle="#b76868";x.beginPath();x.arc(1,-13,4,.25,2.7);x.stroke()}
 // rastro visual do dash
 if(dash.current>0){x.globalAlpha=.2;x.fillStyle="#93c5fd";x.beginPath();x.ellipse(-28,5,22,9,0,0,7);x.fill();x.globalAlpha=1}
 x.globalAlpha=1;x.restore();
 if(found>=8){x.font="72px serif";x.fillText("🌳",860,150);x.font="18px sans-serif";x.fillStyle="#334155";x.fillText("JARDIM CENTRAL",815,190)}
 if(done){centralFx.current+=dt;x.save();x.translate(930,205);x.rotate(now*.001);x.strokeStyle="rgba(96,165,250,.8)";x.lineWidth=5;x.beginPath();x.arc(0,0,30+Math.sin(now*.004)*4,0,7);x.stroke();x.rotate(-now*.002);x.strokeStyle="rgba(244,114,182,.7)";x.beginPath();x.arc(0,0,21,0,7);x.stroke();x.restore();x.fillStyle="#334155";x.font="bold 11px sans-serif";x.fillText("PORTAL DA GUARDIÃ",875,250)}
 x.restore();
 let n=false;if(found<8){let a=fragments[found];n=Math.hypot(q.x-a[0],q.y-a[1])<65}else if(!done)n=Math.hypot(q.x-890,q.y-180)<100;if(mem<8){let a=memories[mem];if(Math.hypot(q.x-a[0],q.y-a[1])<55)n=true}if(catsSolved<CAT_NPCS.length){let cn=CAT_NPCS[catsSolved];if(Math.hypot(q.x-cn.x,q.y-cn.y)<70)n=true}
 if(catsSolved>secret&&secret<SECRET_GATES.length){let g=SECRET_GATES[secret];if(Math.hypot(q.x-g[0],q.y-g[1])<115)n=true}
 if(items.sword===0&&Math.hypot(q.x-2380,q.y-1510)<78)n=true;
 [["bed",2440,250],["chest",1850,1510],["lamp",980,1650],["bench",2580,1120]].forEach(([key,fx,fy])=>{if(!furnitureBag[key]&&!houseItems[key]&&Math.hypot(q.x-fx,q.y-fy)<78)n=true});
 if(dogTrap.current.active&&dogTrap.current.dog&&(Math.hypot(q.x-dogTrap.current.dog.x,q.y-dogTrap.current.dog.y)<95||Math.hypot(q.x-cat.current.x,q.y-cat.current.y)<95))n=true;
 if(Math.hypot(q.x-2125,q.y-1595)<120)n=true;
 if(done&&Math.hypot(q.x-930,q.y-205)<105)n=true;
 setNear(v=>v===n?v:n);raf.current=requestAnimationFrame(loop)}raf.current=requestAnimationFrame(loop);return()=>{cancelAnimationFrame(raf.current);removeEventListener("keydown",kd);removeEventListener("keyup",ku)}},[open,found,mem,done]);
 function shootArrow(){if(!bow||arrows<=0)return;let q=p.current,a=anim.current.dir==="left"?Math.PI:anim.current.dir==="up"?-Math.PI/2:anim.current.dir==="down"?Math.PI/2:0;arrowsFx.current.push({x:q.x,y:q.y-8,vx:Math.cos(a)*12,vy:Math.sin(a)*12,life:60,hit:false});setArrows(v=>Math.max(0,v-1));setToast("FLECHA DISPARADA 🏹")}
 function melee(){if(items.sword<=0)return;swordAnim.current=18;let q=p.current,best=null,bd=95;sn.current.forEach(z=>{let d=Math.hypot(q.x-z.x,q.y-z.y);if(d<bd&&z.stun<=0){best=z;bd=d}});if(!best){setToast("NENHUMA ARANHA AO ALCANCE ⚔️");return}best.hp=(best.hp??3)-Math.max(1,swordLevel);inv.current=22;if(best.hp<=0){best.hp=3;best.stun=360;best.alert=false;setToast("ARANHA ATORDOADA! 🕷️💫")}else setToast(`GOLPE! ${best.hp}/3 ❤️`)}
 function act(){let q=p.current;
 const furnitureLoot=[["bed",2440,250,"🛏️"],["chest",1850,1510,"🧰"],["lamp",980,1650,"🏮"],["bench",2580,1120,"🛠️"]];
 if(items.sword===0&&Math.hypot(q.x-2380,q.y-1510)<78){setItems(v=>({...v,sword:1}));setToast("ESPADA DE LUZ ENCONTRADA ⚔️");setMsg("Agora use ATACAR. A espada só protege você quando o golpe realmente acerta.");return}
 for(const [key,fx,fy,icon] of furnitureLoot){if(!furnitureBag[key]&&!houseItems[key]&&Math.hypot(q.x-fx,q.y-fy)<78){setFurnitureBag(v=>({...v,[key]:true}));setToast(`${icon} ITEM DA CASA COLETADO`);setMsg("Agora leve o item para a Casa da Mi.");return}}
 if(dogTrap.current.active&&dogTrap.current.dog){let dg=dogTrap.current.dog,ca=cat.current;if(Math.hypot(q.x-dg.x,q.y-dg.y)<95||Math.hypot(q.x-ca.x,q.y-ca.y)<95){dogTrap.current.active=false;dogTrap.current.cool=300;dg.x=dg.hx;dg.y=dg.hy;setToast("GATINHO LIBERTO! 🐱💙");setMsg("O cachorro ficou cansado e vai demorar um pouco para voltar a perseguir.");return}}

 if(Math.hypot(q.x-2125,q.y-1595)<120){setHouseOpen(true);setMsg("Dentro da casa, nenhum inimigo consegue alcançar você.");return}
 if(secret>=3&&Math.hypot(q.x-2480,q.y-930)<120){setBossOpen(true);return}


 if(catsSolved<CAT_NPCS.length){let cn=CAT_NPCS[catsSolved];if(Math.hypot(q.x-cn.x,q.y-cn.y)<75){setNpcOpen(cn);setAnswer("");return}}
 if(catsSolved>secret&&secret<SECRET_GATES.length){let g=SECRET_GATES[secret];if(Math.hypot(q.x-g[0],q.y-g[1])<115){setSecretScene({index:secret,name:g[2]});setSecret(v=>v+1);setXp(v=>v+50);setToast("PASSAGEM SECRETA +50 XP 🔐");setMsg(`Você entrou em ${g[2]}.`);return}}
if(mem<8){let a=memories[mem];if(Math.hypot(q.x-a[0],q.y-a[1])<60){setMem(v=>v+1);setXp(v=>v+15);setToast("+15 XP • MEMÓRIA ENCONTRADA 📷");particles.current.push(...Array.from({length:10},(_,i)=>({x:q.x+(i-5)*4,y:q.y,life:45,e:"✨"})));setMsg(`Memória ${mem+1}/8 encontrada. Algumas coisas merecem um lugar onde não possam se perder. 📷`);return}}if(found<8){let a=fragments[found];if(Math.hypot(q.x-a[0],q.y-a[1])<70){setFound(v=>v+1);setXp(v=>v+35);setQuest(v=>v+1);setToast("+35 XP • FRAGMENTO RECUPERADO ✨");particles.current.push(...Array.from({length:14},(_,i)=>({x:q.x+(i-7)*3,y:q.y,life:50,e:i%3?"✨":"🌸"})));setMsg(a[3]);return}}if(found>=8&&!done&&Math.hypot(q.x-890,q.y-180)<110){setDone(true);localStorage.setItem("mi-v4-d","1");unlockSecret("garden-complete");setXp(v=>v+150);setToast("JARDIM CENTRAL DESPERTOU ✨");setMsg("O Jardim Central respondeu. Um portal para a Guardiã das Teias apareceu ao lado da árvore. Prepare-se na casa antes de entrar.");return}
 if(done&&Math.hypot(q.x-930,q.y-205)<115){setBossOpen(true);setToast("ARENA DA GUARDIÃ 🕷️");return}}
 function bossCounter(){if(Math.random()<(bossHp<=3?.48:bossHp<=6?.32:.2)){let n=Math.max(0,life.current-1);life.current=n;setLives(n);setToast("A GUARDIÃ CONTRA-ATACOU! 🕷️");if(n<=0){life.current=maxLives;setLives(maxLives);setBossOpen(false);setBossHp(9);setMsg("Você recuou para se recuperar. Prepare-se na casa e tente novamente.")}}}
  function bossAttack(){if(items.sword<=0){setToast("VOCÊ PRECISA DA ESPADA ⚔️");return}setBossHp(v=>{let n=v-Math.max(1,swordLevel);if(n<=0){setEnding(true);setBossOpen(false);setXp(x=>x+500);return 0}return n});setToast("ACERTOU O GUARDIÃO! ⚔️")}
 function useCloak(){if(items.cloak<=0||invisible.current>0)return;setItems(v=>({...v,cloak:v.cloak-1}));invisible.current=180;setToast("INVISÍVEL POR 3 SEGUNDOS 👻");setMsg("As aranhas não conseguem enxergar você agora!")}
 function submitAnswer(e){e.preventDefault();if(!npcOpen)return;const norm=v=>v.toLowerCase().trim().normalize("NFD").replace(/[\u0300-\u036f]/g,"");const ok=npcOpen.answers.map(norm).includes(norm(answer));if(ok){setCatsSolved(v=>v+1);setXp(v=>v+40);setToast("RESPOSTA CERTA +40 XP 🐱");setMsg(npcOpen.reward);setNpcOpen(null);setAnswer("")}else{setToast("Hmmm... tenta outra resposta 😼");}}
 function stick(e){let sx=e.clientX,sy=e.clientY;setJoyUi({show:true,x:sx,y:sy,kx:0,ky:0});let mv=ev=>{let dx=ev.clientX-sx,dy=ev.clientY-sy,d=Math.hypot(dx,dy)||1,m=Math.min(42,d);let nx=dx/d*m,ny=dy/d*m;joy.current={x:nx/42,y:ny/42};setJoyUi({show:true,x:sx,y:sy,kx:nx,ky:ny})};let end=()=>{joy.current={x:0,y:0};setJoyUi(v=>({...v,show:false}));removeEventListener("pointermove",mv);removeEventListener("pointerup",end);removeEventListener("pointercancel",end)};addEventListener("pointermove",mv);addEventListener("pointerup",end);addEventListener("pointercancel",end)}

 return <section id="jardim" className="bg-[#f6f9ff] px-4 py-16 sm:py-24"><div className="text-center"><button onClick={()=>setOpen(true)} className="rounded-[28px] border border-blue-100 bg-white px-7 py-5 shadow-lg"><b className="block text-xs uppercase tracking-[.2em] text-emerald-700">🌱 Jardim da Mi — A Jornada</b><span className="mt-2 block text-sm text-slate-500">um lugar ficou maior desde a última visita...</span></button></div>{open&&<div className="fixed inset-0 z-[100] overflow-y-auto bg-slate-950/90 p-2 sm:p-5"><div className="mx-auto max-w-5xl overflow-hidden rounded-[25px] bg-white"><header className="flex items-center justify-between p-3"><div><div className="flex flex-wrap items-center gap-2 text-[10px] font-black text-blue-950 sm:text-xs"><span>🌸 {found}/8</span><span>📷 {mem}/8</span><span>🐾 {catsSolved}/3</span><span>🔐 {secret}/3</span><span>🎨 {Math.round(found/8*100)}%</span><span>{"❤️".repeat(lives)}</span><span className="rounded-full bg-amber-100 px-2 py-1 text-amber-800">LV {1+Math.floor(xp/100)} • {xp} XP</span></div><p className="text-[10px] text-slate-500">Explore, converse com os guardiões e descubra caminhos escondidos. 🕷️ Aranhas ficam mais rápidas conforme você avança. SHIFT/CORRER ajuda a escapar. ESPAÇO/E ou DASH faz uma arrancada.</p></div><button onClick={()=>setOpen(false)} className="grid h-11 w-11 place-items-center rounded-full bg-slate-100"><X size={18}/></button></header><div className="relative bg-slate-900">
 <div className="pointer-events-none absolute left-3 top-3 z-20 w-28 rounded-xl bg-slate-950/55 p-2 text-[9px] font-bold text-white backdrop-blur"><div className="mb-1">ENERGIA {stamina}%</div><div className="h-1.5 overflow-hidden rounded-full bg-white/20"><div className="h-full bg-white transition-all" style={{width:`${stamina}%`}}/></div></div><div className="pointer-events-none absolute bottom-3 right-3 z-20 hidden h-24 w-36 overflow-hidden rounded-xl border border-white/30 bg-slate-950/55 p-2 text-[8px] text-white backdrop-blur sm:block"><b>MAPA</b><div className="relative mt-1 h-16 rounded bg-emerald-900/35"><span className="absolute left-[8%] top-[70%]">●</span><span className="absolute left-[40%] top-[35%]">🌸</span><span className="absolute right-[8%] top-[10%]">🕷️</span><span className="absolute right-[20%] bottom-[5%]">🔐</span></div></div>
 {toast&&<div className="pointer-events-none absolute left-1/2 top-16 z-30 -translate-x-1/2 rounded-full bg-slate-950/80 px-4 py-2 text-xs font-black text-white shadow-xl backdrop-blur">{toast}</div>}
 <div className="pointer-events-none absolute right-2 top-[5.6rem] z-20 max-w-[145px] sm:right-3 sm:top-14 sm:max-w-[180px] rounded-xl bg-slate-950/55 p-2 text-[9px] text-white backdrop-blur"><b>MISSÃO ATUAL</b><div className="mt-1 text-white/75">{found<8?`Recupere o fragmento ${found+1}/8 e explore as memórias.`:!done?"Encontre o Jardim Central.":"Entre no Portal da Guardiã."}</div></div>
 {!started&&<div className="absolute inset-0 z-[120] grid place-items-center bg-gradient-to-b from-slate-950/85 to-blue-950/90 p-5 text-center backdrop-blur-sm"><div className="max-w-sm"><div className="text-5xl">🌸</div><h3 className="mt-3 text-2xl font-black text-white">O Jardim da Mi</h3><p className="mt-2 text-sm leading-6 text-blue-100">Explore um parque que recupera as cores conforme você avança. Encontre memórias, converse com guardiões, atravesse passagens secretas e sobreviva aos perigos do jardim.</p><button onClick={()=>setStarted(true)} className="mt-6 min-h-14 w-full rounded-2xl bg-white px-6 font-black text-blue-900 shadow-2xl">ENTRAR NO JARDIM ✨</button><p className="mt-3 text-[10px] text-white/60">No celular, toque e arraste em qualquer lugar livre para andar.</p></div></div>}
 {eduLove&&<div className="pointer-events-none absolute left-1/2 top-[42%] z-[105] -translate-x-1/2 animate-pulse rounded-3xl border border-blue-200/50 bg-slate-950/88 px-5 py-4 text-center text-white shadow-2xl backdrop-blur"><div className="text-4xl">🧑🏻‍💻💙</div><b className="mt-1 block text-sm">Edu apareceu por aqui...</b><span className="block text-xs text-blue-100">eu te amo 🤍</span></div>}
 {eduGuard&&<div className="pointer-events-none absolute inset-x-3 top-1/3 z-[110] mx-auto max-w-xs rounded-3xl border border-blue-200/50 bg-slate-950/90 p-4 text-center text-white shadow-2xl backdrop-blur"><div className="text-4xl">🧑🏻‍💻💙</div><b className="mt-2 block text-sm">PROTEGIDA PELO EDU</b><span className="mt-1 block text-xs text-blue-100">Continue sua jornada. Eu cuido dessa aranha. 😼</span></div>}
 <div className="absolute bottom-3 left-3 z-40 flex gap-2 sm:bottom-4"><div className="grid min-h-11 place-items-center rounded-xl border border-white/40 bg-slate-950/45 px-3 text-[10px] font-black text-white">👻 AUTO</div><div className="grid min-h-11 place-items-center rounded-xl border border-white/40 bg-slate-950/45 px-3 text-[10px] font-black text-white">🛡️ {items.shield}</div><button onClick={melee} disabled={!items.sword} className="min-h-11 rounded-xl border border-white/40 bg-slate-950/55 px-3 text-[10px] font-black text-white disabled:opacity-35">⚔️ ATACAR</button>{bow&&<button onClick={shootArrow} disabled={arrows<=0} className="min-h-11 rounded-xl border border-white/50 bg-slate-950/65 px-3 text-[10px] font-black text-white shadow-lg disabled:opacity-35">🏹 {arrows}</button>}</div>
 <div className="pointer-events-none absolute left-3 top-[5.7rem] z-30 rounded-xl border border-white/30 bg-slate-950/45 px-2 py-1 text-[9px] font-bold text-white backdrop-blur sm:top-16">{companion==="edu"?"🧑🏻‍💻 Edu":"🐱 Gatinho"}{charm?" • 💙":""} • 🏡 {Object.values(houseItems).filter(Boolean).length}/4</div>
 <div className="pointer-events-none absolute left-1/2 top-[5.7rem] z-20 -translate-x-1/2 rounded-full border border-white/30 bg-slate-950/45 px-3 py-1 text-[9px] font-black tracking-wide text-white backdrop-blur sm:top-16">✦ EXPLORE • DESCUBRA • SOBREVIVA</div>
 <canvas ref={cv} width="900" height="570" className="block h-[64svh] min-h-[420px] max-h-[620px] w-full touch-none object-cover sm:h-auto sm:min-h-0"/>{near&&<button onClick={act} className="absolute bottom-24 right-3 z-40 min-h-12 rounded-2xl border border-white/60 bg-white/95 px-4 py-3 text-xs font-black text-blue-900 shadow-2xl backdrop-blur sm:bottom-4 sm:right-4 sm:text-sm">{dogTrap.current.active?"SOLTAR GATINHO 🐱": "PEGAR / INTERAGIR ✨"}</button>}<button onPointerDown={()=>{if(dash.current<=0&&staminaRef.current>=22){dash.current=12;staminaRef.current-=22}}} className="absolute bottom-[5.25rem] right-3 z-30 grid h-14 w-14 place-items-center rounded-full border border-white/50 bg-blue-500/60 text-[9px] font-black text-white shadow-lg sm:hidden">DASH ✦</button><button onPointerDown={()=>keys.current.shift=1} onPointerUp={()=>keys.current.shift=0} onPointerCancel={()=>keys.current.shift=0} className="absolute bottom-3 right-3 z-30 grid h-16 w-16 place-items-center rounded-full border border-white/50 bg-white/25 text-[10px] font-black text-white sm:hidden">CORRER</button><div onPointerDown={stick} className="absolute inset-0 z-20 touch-none sm:hidden"></div>{joyUi.show&&<div className="pointer-events-none fixed z-[150] h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white/60 bg-slate-900/25 shadow-xl backdrop-blur-sm sm:hidden" style={{left:joyUi.x,top:joyUi.y}}><div className="absolute left-1/2 top-1/2 h-10 w-10 rounded-full border border-white/70 bg-white/70 shadow" style={{transform:`translate(calc(-50% + ${joyUi.kx}px), calc(-50% + ${joyUi.ky}px))`}}></div></div>}</div><div className="min-h-[82px] p-4 text-sm leading-6 text-slate-700">{msg}</div></div></div>}
 {houseOpen&&<div className="fixed inset-0 z-[170] grid place-items-center overflow-y-auto bg-amber-950/95 p-5 text-center text-amber-50"><div className="w-full max-w-md py-6"><div className="relative mx-auto mb-4 h-36 w-full max-w-sm overflow-hidden rounded-3xl border border-amber-200/20 bg-gradient-to-b from-amber-100 to-amber-300 shadow-2xl"><div className="absolute inset-x-0 bottom-0 h-12 bg-amber-800/35"/><div className="absolute left-5 top-5 text-4xl">{houseItems.lamp?"🏮":"✨"}</div><div className="absolute bottom-5 left-8 text-5xl">{houseItems.bed?"🛏️":"🪵"}</div><div className="absolute bottom-5 right-8 text-5xl">{houseItems.chest?"🧰":"📦"}</div><div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-5xl">{houseItems.bench?"🛠️":"🪑"}</div><div className="absolute right-5 top-5 text-3xl">🌸</div></div><h3 className="mt-3 text-2xl font-black">Casa da Mi</h3><p className="mt-2 text-sm opacity-75">Zona segura • seus inimigos ficam do lado de fora.</p>
 <div className="mt-5 grid grid-cols-2 gap-2">{[["bed","🛏️","Cama"],["chest","🧰","Baú"],["lamp","🏮","Luminária"],["bench","🛠️","Bancada"]].map(([it,ic,nm])=><button key={it} disabled={!furnitureBag[it]||houseItems[it]} onClick={()=>{setFurnitureBag(v=>({...v,[it]:false}));setHouseItems(v=>({...v,[it]:true}));setToast(`${nm.toUpperCase()} COLOCADO NA CASA`)}} className="rounded-2xl bg-white/10 p-3 text-xs disabled:opacity-35"><span className="block text-3xl">{ic}</span>{houseItems[it]?`${nm} ✓`:furnitureBag[it]?`colocar ${nm}`:`encontre no mapa`}</button>)}</div>
 {houseItems.bed&&<button onClick={()=>{life.current=maxLives;setLives(maxLives);setToast("VIDA RESTAURADA ❤️")}} className="mt-4 min-h-12 w-full rounded-xl bg-white/10 font-black">🛏️ DORMIR • RECUPERAR VIDA</button>}
 {houseItems.chest&&<div className="mt-3 grid grid-cols-2 gap-2"><button onClick={()=>{if(arrows>0){setArrows(v=>v-1);setStash(v=>v+1)}}} className="min-h-12 rounded-xl bg-white/10 text-xs font-black">🧰 GUARDAR FLECHA<br/><span className="opacity-60">baú: {stash}</span></button><button onClick={()=>{if(stash>0&&arrows<8){setStash(v=>v-1);setArrows(v=>v+1)}}} className="min-h-12 rounded-xl bg-white/10 text-xs font-black">🏹 PEGAR FLECHA<br/><span className="opacity-60">carregando: {arrows}</span></button></div>}
 {houseItems.bench&&<button disabled={swordLevel>=2||xp<150} onClick={()=>{setXp(v=>v-150);setSwordLevel(2);setToast("ESPADA MELHORADA ⚔️✨")}} className="mt-3 min-h-12 w-full rounded-xl bg-white/10 text-xs font-black disabled:opacity-35">🛠️ MELHORAR ESPADA — 150 XP<br/><span className="opacity-60">nível {swordLevel}/2</span></button>}
 {houseItems.lamp&&<p className="mt-3 rounded-xl bg-white/10 p-3 text-xs">🏮 A luminária deixa a casa completa. + um cantinho aconchegante só dela.</p>}
 <button onClick={()=>{checkpoint.current={x:2125,y:1660};setToast("CHECKPOINT SALVO 💾")}} className="mt-4 min-h-12 w-full rounded-xl bg-white font-black text-amber-950">💾 SALVAR CHECKPOINT</button><button onClick={()=>setHouseOpen(false)} className="mt-3 text-xs font-bold opacity-70">VOLTAR AO PARQUE</button></div></div>}
 {bossOpen&&<div className="fixed inset-0 z-[180] grid place-items-center overflow-hidden bg-[radial-gradient(circle_at_center,_#312e81_0%,_#0f172a_48%,_#020617_100%)] p-5 text-center text-white"><div className="pointer-events-none absolute inset-0 opacity-25" style={{backgroundImage:"repeating-radial-gradient(circle at 50% 50%, transparent 0 36px, rgba(255,255,255,.35) 38px 39px)"}}/><div className="w-full max-w-sm"><div className="text-7xl">{bossHp>6?"🕷️":bossHp>3?"🕷️🕸️":"🕷️🔥"}</div><h3 className="mt-3 text-2xl font-black">A Guardiã das Teias</h3><div className="mt-2 text-[10px] font-black tracking-widest text-white/60">{bossHp>6?"FASE 1 • DESPERTAR":bossHp>3?"FASE 2 • TEIAS":"FASE 3 • FÚRIA"}</div><p className="mt-2 text-xs text-white/60">{bossHp>6?"Ela ainda está estudando seus movimentos.":bossHp>3?"As teias ficam mais densas. Flechas são muito úteis agora.":"Última fase. A Guardiã está furiosa — termine a luta!"}</p><div className="mx-auto mt-5 h-3 max-w-xs overflow-hidden rounded-full bg-white/10"><div className="h-full bg-white transition-all" style={{width:`${bossHp/9*100}%`}}/></div><p className="mt-2 text-xs">{bossHp}/9 ❤️</p><div className="mt-5 grid grid-cols-2 gap-3"><button onClick={()=>{bossAttack();setTimeout(bossCounter,250)}} className="min-h-14 rounded-xl bg-white font-black text-slate-950">⚔️ ATACAR</button><button onClick={()=>{if(arrows>0){setArrows(v=>v-1);setBossHp(v=>{let n=Math.max(0,v-1);if(n===0){setEnding(true);setBossOpen(false);setXp(x=>x+500)}return n});setToast("FLECHA ACERTOU 🏹");setTimeout(bossCounter,250)}}} disabled={!bow||arrows<=0} className="min-h-14 rounded-xl border border-white/30 bg-white/10 font-black disabled:opacity-30">🏹 FLECHA ({arrows})</button></div><button onClick={()=>setBossOpen(false)} className="mt-5 text-xs opacity-60">recuar para o parque</button></div></div>}
 {ending&&<div className="fixed inset-0 z-[200] grid place-items-center bg-gradient-to-b from-blue-950 to-slate-950 p-6 text-center text-white"><div className="max-w-sm"><div className="text-6xl">🌸💙✨</div><h2 className="mt-5 text-3xl font-black">O Jardim da Mi está completo.</h2><p className="mt-4 text-sm leading-7 text-blue-100">Você recuperou as memórias, enfrentou as aranhas, montou um lar e venceu a Guardiã. O jardim finalmente está vivo — e ainda guarda espaço para novas histórias.</p><p className="mt-5 text-xl font-black">Eu te amo, Mi. 🤍</p><button onClick={()=>{setEnding(false);setBossHp(9)}} className="mt-8 min-h-14 w-full rounded-2xl bg-white font-black text-blue-950">CONTINUAR EXPLORANDO</button></div></div>}
 {secretScene&&<div className={`fixed inset-0 z-[160] grid place-items-center p-6 text-center ${secretScene.index===0?"bg-white text-slate-800":secretScene.index===1?"bg-amber-950 text-amber-50":"bg-blue-950 text-blue-50"}`}><div className="max-w-sm">
 <div className="text-6xl">{secretScene.index===0?"🏹":secretScene.index===1?"🧑🏻‍💻":"💙"}</div>
 <h3 className="mt-5 text-2xl font-black">{secretScene.name}</h3>
 {secretScene.index===0&&<><p className="mt-3 text-sm leading-6 opacity-80">No centro da sala existe um arco com uma pequena inscrição: <b>“Para quando eu não estiver perto o bastante.”</b></p><div className="mt-5 rounded-2xl border border-current/20 p-4 text-sm"><b>🏹 Arco do Edu</b><br/>Recebe 3 flechas. Cada flecha deixa uma aranha muito lenta por alguns segundos.</div><button onClick={()=>{setBow(true);setArrows(3);setToast("ARCO DO EDU DESBLOQUEADO 🏹");setSecretScene(null)}} className="mt-6 min-h-14 w-full rounded-2xl bg-slate-900 px-5 font-black text-white shadow-xl">PEGAR ARCO + 3 FLECHAS</button></>}
 {secretScene.index===1&&<><p className="mt-3 text-sm leading-6 opacity-80">Edu está esperando aqui. Você pode convidá-lo para seguir a jornada ou continuar com o gatinho.</p><div className="mt-5 grid grid-cols-2 gap-3"><button onClick={()=>{setCompanion("edu");setToast("EDU ENTROU NA JORNADA 💙");setSecretScene(null)}} className="min-h-24 rounded-2xl bg-white/15 p-3 font-black">🧑🏻‍💻<br/>IR COM EDU</button><button onClick={()=>{setCompanion("cat");setToast("GATINHO CONTINUA 🐱");setSecretScene(null)}} className="min-h-24 rounded-2xl bg-white/15 p-3 font-black">🐱<br/>FICAR COM GATO</button></div><p className="mt-3 text-[11px] opacity-65">Com Edu, os cachorros deixam de perseguir seu companheiro.</p></>}
 {secretScene.index===2&&<><p className="mt-3 text-sm leading-6 opacity-80">Uma pequena luz azul pulsa no chão. É um amuleto escondido do jardim.</p><div className="mt-5 rounded-2xl border border-white/20 bg-white/10 p-4 text-sm"><b>💙 Amuleto do Jardim</b><br/>Uma lembrança permanente de que você encontrou todos esses caminhos.</div><button onClick={()=>{setCharm(true);setXp(v=>v+100);setToast("AMULETO +100 XP 💙");setSecretScene(null)}} className="mt-6 min-h-14 w-full rounded-2xl bg-white px-5 font-black text-blue-950 shadow-xl">GUARDAR AMULETO</button></>}
 <button onClick={()=>setSecretScene(null)} className="mt-4 text-xs font-bold opacity-60">voltar sem escolher</button>
 </div></div>}
 {npcOpen&&<div className="fixed inset-0 z-[130] grid place-items-center bg-slate-950/75 p-4 backdrop-blur-sm"><form onSubmit={submitAnswer} className="w-full max-w-sm rounded-[28px] bg-white p-5 shadow-2xl sm:p-6"><div className="text-5xl">{npcOpen.animal}</div><p className="mt-4 text-[10px] font-black uppercase tracking-[.2em] text-blue-700">{npcOpen.name} • {npcOpen.role}</p><h3 className="mt-2 text-xl font-bold leading-7 text-slate-900">{npcOpen.q}</h3><input autoFocus value={answer} onChange={e=>setAnswer(e.target.value)} placeholder="Escreva sua resposta..." className="mt-5 h-12 w-full rounded-2xl border border-slate-200 px-4 text-base outline-none focus:border-blue-400"/><div className="mt-4 flex gap-2"><button type="button" onClick={()=>setNpcOpen(null)} className="h-12 flex-1 rounded-2xl bg-slate-100 text-sm font-bold text-slate-600">depois</button><button type="submit" className="h-12 flex-1 rounded-2xl bg-blue-700 text-sm font-black text-white">responder ✨</button></div></form></div>}
 </section>
}
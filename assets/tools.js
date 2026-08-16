function doCalc(){
try{
let x=document.getElementById("expr").value.trim();
if(!/^[0-9+*/().%\s-]+$/.test(x))return err("Use numbers and +, -, *, /, %, and parentheses only.");
x=x.replace(/(\d+(?:\.\d+)?)%/g,"($1/100)");
const tokens=x.match(/\d+(?:\.\d+)?|[()+*/-]/g);if(!tokens)return err("Enter a valid expression.");
let i=0;
const exprP=()=>{let v=term();while(tokens[i]==="+"||tokens[i]==="-"){let o=tokens[i++],r=term();v=o==="+"?v+r:v-r}return v};
const term=()=>{let v=factor();while(tokens[i]==="*"||tokens[i]==="/"){let o=tokens[i++],r=factor();if(o==="/"&&r===0)throw Error();v=o==="*"?v*r:v/r}return v};
const factor=()=>{if(tokens[i]==="+")i++;if(tokens[i]==="-"){i++;return -factor()}if(tokens[i]==="("){i++;let v=exprP();if(tokens[i++]!==")")throw Error();return v}let n=Number(tokens[i++]);if(!Number.isFinite(n))throw Error();return n};
let v=exprP();if(i!==tokens.length||!Number.isFinite(v))throw Error();show(v);
}catch(e){err("Enter a valid expression.")}
}
function percentage(){let a=+pa.value,b=+pb.value;show(`${b}% of ${a} = ${a*b/100}\n${a} is ${(a/b*100).toFixed(2)}% of ${b}.`)}
function discount(){let p=+price.value,d=+disc.value,s=p*d/100;show(`Savings: $${f(s)}\nSale price: $${f(p-s)}`)}
function gcd(a,b){a=Math.abs(a);b=Math.abs(b);while(b){[a,b]=[b,a%b]}return a}
function fraction(){let a=+n1.value,b=+d1.value,c=+n2.value,d=+d2.value;if(!b||!d)return err("Denominators cannot be zero.");let n,den;if(op.value==="+"){n=a*d+c*b;den=b*d}else if(op.value==="-"){n=a*d-c*b;den=b*d}else if(op.value==="*"){n=a*c;den=b*d}else{if(!c)return err("Cannot divide by zero.");n=a*d;den=b*c}let g=gcd(n,den);show(`${n/g}/${den/g}`)}
const units={miles:1609.344,kilometers:1000,feet:.3048,meters:1,yards:.9144,inches:.0254,centimeters:.01,pounds:.45359237,kilograms:1,ounces:.0283495231,liters:1,gallons:3.785411784};
function convert(){let v=+cv.value,a=from.value,b=to.value,r;if(a==="Fahrenheit"&&b==="Celsius")r=(v-32)*5/9;else if(a==="Celsius"&&b==="Fahrenheit")r=v*9/5+32;else if(units[a]&&units[b])r=v*units[a]/units[b];else return err("Those units cannot be converted directly.");show(`${f(r)} ${b}`)}
async function currency(){try{show("Loading rate…");let r=await fetch(`https://api.frankfurter.app/latest?amount=${encodeURIComponent(amt.value)}&from=${cf.value}&to=${ct.value}`);let j=await r.json();show(`${amt.value} ${cf.value} = ${j.rates[ct.value]} ${ct.value}`)}catch(e){err("Exchange-rate service unavailable right now.")}}
function timeConvert(){let v=+tv.value,m={seconds:1,minutes:60,hours:3600,days:86400,weeks:604800};show(`${f(v*m[tu.value]/m[tout.value])} ${tout.value}`)}
let tid,cdid;function startTimer(){clearInterval(tid);let n=(+tm.value||0)*60+(+ts.value||0);let tick=()=>{out.textContent=`${String(Math.floor(n/60)).padStart(2,"0")}:${String(n%60).padStart(2,"0")}`;if(n<=0)clearInterval(tid);n--};tick();tid=setInterval(tick,1000)}function stopTimer(){clearInterval(tid)}
function startCountdown(){clearInterval(cdid);let t=new Date(target.value);cdid=setInterval(()=>{let d=t-new Date();if(d<=0){out.textContent="Time's up!";clearInterval(cdid);return}let s=Math.floor(d/1000),days=Math.floor(s/86400);s%=86400;let h=Math.floor(s/3600);s%=3600;let m=Math.floor(s/60),sec=s%60;out.textContent=`${days}d ${h}h ${m}m ${sec}s`},1000)}
function dateCalc(){let d=new Date(base.value+"T12:00:00");if(isNaN(d))return err("Choose a date.");d.setDate(d.getDate()+(+days.value||0));show(d.toLocaleDateString(undefined,{year:"numeric",month:"long",day:"numeric"}))}
function dateDiff(){let a=new Date(dfrom.value+"T12:00:00"),b=new Date(dto.value+"T12:00:00");show(`${Math.abs(Math.round((b-a)/86400000))} days`)}
function generate(){let t=gt.value,v;if(t==="number")v=Math.floor(Math.random()*(+gmax.value||100))+1;if(t==="letter")v=String.fromCharCode(65+Math.floor(Math.random()*26));if(t==="password")v=randomPass(16);if(t==="coin")v=Math.random()<.5?"Heads":"Tails";if(t==="dice")v=Math.floor(Math.random()*6)+1;show(v)}
const first=["Alex","Jordan","Taylor","Morgan","Casey","Riley","Avery","Jamie","Cameron","Drew","Quinn","Parker","Reese","Skyler"];const last=["Stone","River","Parker","West","Lane","Brooks","Reed","Fox","Hayes","Wells","Hart","Cole"];
function nameGen(){let a=first[Math.floor(Math.random()*first.length)],b=last[Math.floor(Math.random()*last.length)];show(ng.value==="First name"?a:ng.value==="Character name"?`${a} ${b}`:`${b} & ${a}`)}
function randomPass(n){let c="ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%";return Array.from({length:n},()=>c[Math.floor(Math.random()*c.length)]).join("")}
function passwordGen(){show(randomPass(Math.max(6,Math.min(64,+plen.value||16))))}
function dice(){let n=Math.max(1,Math.min(20,+dn.value||1)),r=[];for(let i=0;i<n;i++)r.push(Math.floor(Math.random()*6)+1);show(r.join(", ")+"  |  Total: "+r.reduce((a,b)=>a+b,0))}
function palindrome(){let s=pt.value.toLowerCase().replace(/[^a-z0-9]/g,"");show(s&&s===s.split("").reverse().join("")?"Yes — palindrome.":"No — not a palindrome.")}
function wordCount(){let s=wt.value.trim();show(`Words: ${s?s.split(/\s+/).length:0}\nCharacters: ${wt.value.length}\nSentences: ${s?s.split(/[.!?]+/).filter(Boolean).length:0}`)}
const dictWords=["listen","silent","enlist","inlets","stone","notes","onset","tones","hello","world","earth","heart","rate","tear","react","trace","crate","cater","race","care","acre"];
function anagram(){let s=letters.value.toLowerCase().replace(/[^a-z]/g,"").split("").sort().join("");let r=dictWords.filter(w=>w.split("").sort().join("")===s);show(r.length?r.join(", "):"No matches in the starter dictionary.")}
async function dictionary(){let w=word.value.trim();if(!w)return;show("Looking up…");try{let r=await fetch("https://api.dictionaryapi.dev/api/v2/entries/en/"+encodeURIComponent(w));let j=await r.json(),d=[];j[0].meanings.forEach(m=>m.definitions.slice(0,2).forEach(x=>d.push(`${m.partOfSpeech||""}: ${x.definition}`)));show(d.join("\n\n")||"No definition found.")}catch(e){err("Could not reach the dictionary service.")}}
function weekday(){let d=new Date(wdate.value+"T12:00:00");show(isNaN(d)?"Choose a date.":d.toLocaleDateString(undefined,{weekday:"long",year:"numeric",month:"long",day:"numeric"}))}
function tipCalc(){let b=+bill.value,t=+tipPct.value,p=Math.max(1,+people.value||1),x=b*t/100;show(`Tip: $${f(x)}\nTotal: $${f(b+x)}\nPer person: $${f((b+x)/p)}`)}
function salesTax(){let p=+sp.value,t=+tax.value,x=p*t/100;show(`Tax: $${f(x)}\nTotal: $${f(p+x)}`)}
function loan(){let P=+la.value,r=(+lr.value/100)/12,n=+ly.value*12;if(!P||!n)return err("Enter loan amount and years.");let pay=r?P*r/(1-Math.pow(1+r,-n)):P/n;show(`Monthly payment: $${f(pay)}\nTotal paid: $${f(pay*n)}\nInterest: $${f(pay*n-P)}`)}
function mortgage(){let P=+ma.value-(+md.value||0),r=(+mr.value/100)/12,n=+my.value*12;if(P<=0)return err("Down payment must be less than home price.");let pay=r?P*r/(1-Math.pow(1+r,-n)):P/n;show(`Loan: $${f(P)}\nMonthly principal & interest: $${f(pay)}\nTotal interest: $${f(pay*n-P)}`)}
function compound(){let P=+cp.value,r=+cr.value/100,n=+cn.value||1,t=+cy.value,A=P*Math.pow(1+r/n,n*t);show(`Future value: $${f(A)}\nInterest earned: $${f(A-P)}`)}
function simpleInterest(){let P=+sip.value,I=P*(+sir.value/100)*(+siy.value);show(`Interest: $${f(I)}\nTotal: $${f(P+I)}`)}
function splitBill(){let b=+sb.value,t=+st.value,p=Math.max(1,+sppl.value||1),total=b*(1+t/100);show(`Total: $${f(total)}\nEach: $${f(total/p)}`)}
function ageCalc(){let d=new Date(dob.value+"T12:00:00"),n=new Date();if(isNaN(d))return err("Choose a birth date.");let age=n.getFullYear()-d.getFullYear();if(n.getMonth()<d.getMonth()||(n.getMonth()===d.getMonth()&&n.getDate()<d.getDate()))age--;show(`Age: ${age} years`)}
function bmi(){let kg=(+weight.value)*.45359237,m=(+height.value)*.0254,x=kg/(m*m);show(`BMI: ${x.toFixed(1)}\nGeneral adult categories: under 18.5, 18.5–24.9, 25–29.9, 30+.`)}
function gpa(){let a=grades.value.split(",").map(Number).filter(Number.isFinite);if(!a.length)return err("Enter grade points separated by commas.");show(`Estimated GPA: ${(a.reduce((x,y)=>x+y,0)/a.length).toFixed(2)}`)}
function calorie(){let A=+agec.value,H=+cm.value,W=+kg.value,b=sex.value==="m"?10*W+6.25*H-5*A+5:10*W+6.25*H-5*A-161;show(`Estimated BMR: ${Math.round(b)} kcal/day\nEstimated maintenance: ${Math.round(b*+activity.value)} kcal/day`)}
function quadratic(){let a=+qa.value,b=+qb.value,c=+qc.value;if(!a)return err("a cannot be 0.");let d=b*b-4*a*c;if(d<0)return show("No real solutions.");let x1=(-b+Math.sqrt(d))/(2*a),x2=(-b-Math.sqrt(d))/(2*a);show(x1===x2?`x = ${x1}`:`x₁ = ${x1}\nx₂ = ${x2}`)}
function finder(){let a=Math.abs(+fa.value),b=Math.abs(+fb.value);if(!a||!b)return err("Enter two non-zero numbers.");let r=[];for(let i=1;i<=1000;i++)if(i%a===0&&i%b===0)r.push(i);show(r.join(", "))}
function gcdlcm(){let a=+ga.value,b=+gb.value,g=gcd(a,b);show(`GCD: ${g}\nLCM: ${Math.abs(a*b)/g}`)}
function prime(){let n=+pn.value;if(n<2)return show("Not prime.");for(let i=2;i*i<=n;i++)if(n%i===0)return show("Not prime.");show("Prime number.")}
function picker(){let a=items.value.split(/\n|,/).map(x=>x.trim()).filter(Boolean);show(a.length?a[Math.floor(Math.random()*a.length)]:"Add some choices first.")}
function estimate(){let b=+eb.value,t=+et.value,p=Math.max(1,+ep.value||1),total=b*(1+t/100);show(`Total: $${f(total)}\nPer person: $${f(total/p)}`)}
function fuel(){let m=+miles.value,mpg=+document.getElementById("mpg").value,g=+gas.value;if(!mpg)return err("MPG must be greater than zero.");show(`Fuel needed: ${f(m/mpg)} gallons\nEstimated cost: $${f(m/mpg*g)}`)}
function paint(){let a=+wall.value,c=+coverage.value,n=+coats.value||1;if(!c)return err("Coverage must be greater than zero.");show(`Estimated paint: ${f(a*n/c)} gallons`)}
function concrete(){let type=ctype.value,L=+cl.value,W=+cw.value,D=+cd.value;if(!L||!D)return err("Enter dimensions.");let ftD=D/12,cuft=type==="round"?Math.PI*Math.pow(L/2,2)*ftD:L*W*ftD;show(`Concrete: ${f(cuft)} cubic feet\nWith 10% waste: ${f(cuft*1.1)} cubic feet\nApprox. cubic yards: ${f(cuft/27)}`)}
if(location.hash&&tools.some(t=>t.id===location.hash.slice(1)))openTool(location.hash.slice(1));

function home(){location.href='/';}

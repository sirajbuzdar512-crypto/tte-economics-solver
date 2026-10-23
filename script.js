const f=x=>isFinite(x)?(+x.toFixed(4)).toLocaleString('en-US',{maximumFractionDigits:4}):'undefined';
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
const $=id=>document.getElementById(id);
const T=[];
const add=(g,n,kw,fl,s)=>T.push({g,n,kw,s,fl:fl.map(x=>{const p=x.split('|'),fg=p[3]||'';return{k:p[0],l:p[1],d:p[2],o:fg.includes('o'),L:fg.includes('L'),p:fg.includes('p')}})});
const A='Microeconomics',B='Macroeconomics',C='International Trade',D='Statistics & Econometrics',E='Islamic Economics',gM='Money & Banking',gP='Public Finance',gV='Development Economics',gW='Labour Economics',gG='Game Theory',gN='Finance & Investment';

function el(n,kw,xn,qn,e,intp){add(A,n,kw,['x1|'+xn+' (old)|'+e[0],'x2|'+xn+' (new)|'+e[1],'q1|'+qn+' (old)|'+e[2],'q2|'+qn+' (new)|'+e[3]],v=>{
 const dq=v.q2-v.q1,aq=(v.q1+v.q2)/2,dx=v.x2-v.x1,ax=(v.x1+v.x2)/2,pq=dq/aq*100,px=dx/ax*100,E=pq/px;
 return[['E = %ΔQ ÷ %ΔX (midpoint method)'],[`ΔQ = ${f(v.q2)} − ${f(v.q1)} = ${f(dq)}; average Q = ${f(aq)}`,`%ΔQ = ${f(dq)} ÷ ${f(aq)} × 100 = ${f(pq)}%`,`ΔX = ${f(v.x2)} − ${f(v.x1)} = ${f(dx)}; average X = ${f(ax)}`,`%ΔX = ${f(dx)} ÷ ${f(ax)} × 100 = ${f(px)}%`,`E = ${f(pq)} ÷ ${f(px)} = ${f(E)}`],[['Elasticity',f(E)]],intp(E)]})}
el('Price elasticity of demand','price elasticity demand elastic midpoint','Price','Quantity demanded',[10,8,100,130],E=>Math.abs(Math.abs(E)-1)<1e-9?'Unit elastic: total revenue does not change when price changes.':Math.abs(E)>1?'Elastic (|E| > 1): a price cut raises total revenue.':'Inelastic (|E| < 1): a price cut lowers total revenue.');
el('Price elasticity of supply','elasticity supply supplied','Price','Quantity supplied',[10,12,100,130],E=>E>1?'Elastic supply (E > 1).':E<1?'Inelastic supply (E < 1).':'Unit elastic supply.');
el('Income elasticity of demand','income elasticity normal inferior luxury necessity','Income','Quantity demanded',[1000,1200,50,60],E=>E<0?'Negative: inferior good.':E<1?'Between 0 and 1: normal good, a necessity.':'Greater than 1: normal good, a luxury.');
el('Cross-price elasticity','cross elasticity substitute complement','Price of the other good','Quantity of this good',[10,12,100,120],E=>Math.abs(E)<1e-9?'Zero: unrelated goods.':E>0?'Positive: substitutes.':'Negative: complements.');

add(A,'Market equilibrium, surplus & price control','equilibrium demand supply surplus ceiling floor shortage consumer producer',['a|Demand intercept a (Qd = a − bP)|100','b|Demand slope b|2|p','c|Supply intercept c (Qs = c + dP)|-20','d|Supply slope d|3|p','pc|Controlled price (optional)|30|o'],v=>{
 const{a,b,c,d,pc}=v,P=(a-c)/(b+d),Q=a-b*P,pm=a/b,pn=Math.max(0,-c/d),CS=(pm-P)*Q/2,PS=c*(P-pn)+d/2*(P*P-pn*pn);
 const st=[`Set Qd = Qs: ${f(a)} − ${f(b)}P = ${f(c)} + ${f(d)}P`,`P* = (a − c) ÷ (b + d) = ${f(a-c)} ÷ ${f(b+d)} = ${f(P)}`,`Q* = a − bP* = ${f(Q)}`,`Highest price on demand curve = a ÷ b = ${f(pm)}; CS = ½ × (${f(pm)} − ${f(P)}) × ${f(Q)} = ${f(CS)}`,`Lowest supply price = ${f(pn)}; PS = area between price and supply curve = ${f(PS)}`];
 const an=[['Equilibrium price',f(P)],['Equilibrium quantity',f(Q)],['Consumer surplus',f(CS)],['Producer surplus',f(PS)]];let nt='';
 if(!isNaN(pc)){const qd=a-b*pc,qs=c+d*pc,qt=Math.min(qd,qs),pd=(a-qt)/b,ps=(qt-c)/d,dw=(pd-ps)*(Q-qt)/2;
  st.push(`At price ${f(pc)}: Qd = ${f(qd)}, Qs = ${f(qs)}`,`${qd>qs?'Shortage':'Surplus'} = |Qd − Qs| = ${f(Math.abs(qd-qs))}; quantity traded = min(Qd, Qs) = ${f(qt)}`,`Deadweight loss = ½ × (${f(pd)} − ${f(ps)}) × (${f(Q)} − ${f(qt)}) = ${f(dw)}`);
  an.push([qd>qs?'Shortage':'Surplus',f(Math.abs(qd-qs))],['Deadweight loss',f(dw)]);nt=pc<P?'The price is below equilibrium, so it works as a binding price ceiling (shortage).':pc>P?'The price is above equilibrium, so it works as a binding price floor (surplus).':'The controlled price equals the equilibrium price.'}
 return[['Qd = Qs  →  P* = (a − c) ÷ (b + d)'],st,an,nt]});

add(A,'Tax incidence & deadweight loss','tax incidence burden deadweight loss per unit',['a|Demand intercept a (Qd = a − bP)|100','b|Demand slope b|2|p','c|Supply intercept c (Qs = c + dP)|-20','d|Supply slope d|3|p','t|Per-unit tax t|5'],v=>{
 const{a,b,c,d,t}=v,P0=(a-c)/(b+d),Q0=a-b*P0,Pc=(a-c+d*t)/(b+d),Pp=Pc-t,Q=a-b*Pc,cb=Pc-P0,pb=P0-Pp,dw=t*(Q0-Q)/2;
 return[['Supply with tax: Qs = c + d(P − t)'],[`Before tax: P0 = ${f(P0)}, Q0 = ${f(Q0)}`,`Equate Qd = Qs with tax: P(buyers) = (a − c + dt) ÷ (b + d) = ${f(Pc)}`,`Price received by sellers = ${f(Pc)} − ${f(t)} = ${f(Pp)}`,`New quantity Q = a − b × ${f(Pc)} = ${f(Q)}`,`Consumer burden per unit = ${f(Pc)} − ${f(P0)} = ${f(cb)}; producer burden per unit = ${f(P0)} − ${f(Pp)} = ${f(pb)}`,`Tax revenue = t × Q = ${f(t*Q)}`,`Deadweight loss = ½ × t × (Q0 − Q) = ${f(dw)}`],[['Price paid by buyers',f(Pc)],['Price received by sellers',f(Pp)],['Consumer share of tax',f(cb)+' per unit'],['Producer share of tax',f(pb)+' per unit'],['Tax revenue',f(t*Q)],['Deadweight loss',f(dw)]],'The side with the less elastic (steeper) curve bears the larger share of the tax.']});

add(A,'Utility maximisation (Cobb-Douglas)','utility maximisation consumer budget cobb douglas optimal bundle',['al|Exponent α on good X (U = X^α · Y^β)|0.4','be|Exponent β on good Y|0.6','M|Income M|1000','px|Price of X|10','py|Price of Y|20'],v=>{
 const{al,be,M,px,py}=v,x=al/(al+be)*M/px,y=be/(al+be)*M/py;
 return[['Optimum: MUx ÷ MUy = Px ÷ Py, with Px·X + Py·Y = M','X* = [α ÷ (α + β)] × M ÷ Px;  Y* = [β ÷ (α + β)] × M ÷ Py'],[`Spend share on X = α ÷ (α + β) = ${f(al/(al+be))}`,`X* = ${f(al/(al+be))} × ${f(M)} ÷ ${f(px)} = ${f(x)}`,`Y* = ${f(be/(al+be))} × ${f(M)} ÷ ${f(py)} = ${f(y)}`,`Budget check: ${f(px)}×${f(x)} + ${f(py)}×${f(y)} = ${f(px*x+py*y)}`,`Utility U = ${f(x)}^${f(al)} × ${f(y)}^${f(be)} = ${f(Math.pow(x,al)*Math.pow(y,be))}`],[['Optimal X',f(x)],['Optimal Y',f(y)],['Maximum utility',f(Math.pow(x,al)*Math.pow(y,be))]],'']});

add(A,'Cost functions (TC, AC, MC)','cost total average marginal fixed variable atc avc mc',['F|Fixed cost F (TC = F + aQ + bQ²)|100','a|a|5','b|b|0.5','Q|Output Q|10'],v=>{
 const{F,a,b,Q}=v,tv=a*Q+b*Q*Q,tc=F+tv,mc=a+2*b*Q,qm=Math.sqrt(F/b),am=a+2*Math.sqrt(F*b);
 return[['TC = F + aQ + bQ²','MC = dTC/dQ = a + 2bQ','ATC = TC ÷ Q'],[`TFC = ${f(F)}`,`TVC = aQ + bQ² = ${f(tv)}`,`TC = TFC + TVC = ${f(tc)}`,`AFC = ${f(F/Q)}; AVC = ${f(tv/Q)}; ATC = ${f(tc/Q)}`,`MC = a + 2bQ = ${f(mc)}`,`ATC is lowest where MC = ATC: Q = √(F ÷ b) = ${f(qm)}, minimum ATC = a + 2√(Fb) = ${f(am)}`],[['Total cost',f(tc)],['Average total cost',f(tc/Q)],['Marginal cost',f(mc)],['Minimum-ATC output',f(qm)]],'']});

add(A,'Perfect competition: profit maximisation','perfect competition profit maximisation firm marginal cost price taker shutdown',['P|Market price P|30','F|Fixed cost F (TC = F + aQ + bQ²)|100','a|a|5','b|b|0.5'],v=>{
 const{P,F,a,b}=v,q=Math.max(0,(P-a)/(2*b)),tr=P*q,tc=F+a*q+b*q*q,pr=tr-tc,avc=a+b*q;
 return[['Profit is maximised where P = MC, MC = a + 2bQ'],[`Set P = MC: ${f(P)} = ${f(a)} + ${f(2*b)}Q`,`Q* = (P − a) ÷ 2b = ${f(q)}`,`TR = P × Q = ${f(tr)}; TC = F + aQ + bQ² = ${f(tc)}`,`Profit = TR − TC = ${f(pr)}`,`AVC at Q* = ${f(avc)}; break-even price (minimum ATC) = ${f(a+2*Math.sqrt(F*b))}`],[['Profit-maximising output',f(q)],['Total revenue',f(tr)],['Total cost',f(tc)],['Profit',f(pr)]],q===0?'P is below minimum AVC: shut down and lose only the fixed cost.':pr>=0?'The firm covers all its costs.':P>=avc?'A loss, but P covers AVC, so keep producing in the short run to minimise the loss.':'P is below AVC: shut down.']});

add(A,'Monopoly: price, output & deadweight loss','monopoly monopolist marginal revenue lerner deadweight',['a|Demand intercept a (P = a − bQ)|100','b|Demand slope b|1|p','c|Constant marginal cost c|20','F|Fixed cost (optional, 0 if none)|0|o'],v=>{
 const{a,b,c}=v,F=isNaN(v.F)?0:v.F,q=(a-c)/(2*b),p=a-b*q,pr=(p-c)*q-F,qc=(a-c)/b,dw=(p-c)*(qc-q)/2;
 return[['MR = a − 2bQ; profit is maximised where MR = MC'],[`Set MR = MC: ${f(a)} − ${f(2*b)}Q = ${f(c)}`,`Q_m = (a − c) ÷ 2b = ${f(q)}`,`P_m = a − bQ_m = ${f(p)}`,`Profit = (P − c)Q − F = ${f(pr)}`,`Lerner index = (P − c) ÷ P = ${f((p-c)/p)}`,`Competitive benchmark: P = MC = ${f(c)}, Q_c = ${f(qc)}`,`Deadweight loss = ½ × (${f(p)} − ${f(c)}) × (${f(qc)} − ${f(q)}) = ${f(dw)}`],[['Monopoly output',f(q)],['Monopoly price',f(p)],['Profit',f(pr)],['Deadweight loss',f(dw)]],'The monopolist produces less and charges more than a competitive market.']});

add(A,'Cournot duopoly','cournot duopoly oligopoly reaction function nash',['a|Demand intercept a (P = a − bQ)|100','b|Demand slope b|1|p','c1|Marginal cost of firm 1|10','c2|Marginal cost of firm 2|10'],v=>{
 const{a,b,c1,c2}=v,q1=(a-2*c1+c2)/(3*b),q2=(a-2*c2+c1)/(3*b),Q=q1+q2,P=a-b*Q;
 return[['Reaction function of firm i: qi = (a − ci − b·qj) ÷ 2b'],[`Firm 1: q1 = (${f(a)} − ${f(c1)} − ${f(b)}·q2) ÷ ${f(2*b)}`,`Firm 2: q2 = (${f(a)} − ${f(c2)} − ${f(b)}·q1) ÷ ${f(2*b)}`,`Solve together: q1 = (a − 2c1 + c2) ÷ 3b = ${f(q1)}; q2 = (a − 2c2 + c1) ÷ 3b = ${f(q2)}`,`Market quantity Q = ${f(Q)}; price P = a − bQ = ${f(P)}`,`Profit 1 = (P − c1)q1 = ${f((P-c1)*q1)}; Profit 2 = (P − c2)q2 = ${f((P-c2)*q2)}`],[['Output of firm 1',f(q1)],['Output of firm 2',f(q2)],['Market price',f(P)],['Profit of firm 1',f((P-c1)*q1)],['Profit of firm 2',f((P-c2)*q2)]],q1<0||q2<0?'A negative output means that firm would not produce at these costs; the formula does not apply.':'']});

add(A,'Break-even analysis','break even contribution margin target profit units',['F|Fixed cost|50000','P|Price per unit|50','v|Variable cost per unit|30','tg|Target profit (optional)|10000|o'],v=>{
 const{F,P,v:vc}=v,cm=P-vc,q=F/cm,st=[`Contribution margin per unit = P − v = ${f(cm)}`,`Break-even units = F ÷ (P − v) = ${f(q)}`,`Break-even revenue = ${f(q*P)}`],an=[['Break-even units',f(q)],['Break-even revenue',f(q*P)]];
 if(!isNaN(v.tg)){const q2=(F+v.tg)/cm;st.push(`Units for target profit = (F + target) ÷ (P − v) = ${f(q2)}`);an.push(['Units for target profit',f(q2)])}
 return[['Q = F ÷ (P − v)'],st,an,'']});

add(B,'GDP by expenditure approach','gdp expenditure consumption investment government exports imports net',['C|Consumption C|5000','I|Investment I|1500','G|Government spending G|1800','X|Exports X|700','M|Imports M|900'],v=>{
 const{C,I,G,X,M}=v,nx=X-M,Y=C+I+G+nx;
 return[['GDP = C + I + G + (X − M)'],[`Net exports = X − M = ${f(nx)}`,`GDP = ${f(C)} + ${f(I)} + ${f(G)} + ${f(nx)} = ${f(Y)}`,`Shares of GDP: C = ${f(C/Y*100)}%, I = ${f(I/Y*100)}%, G = ${f(G/Y*100)}%, NX = ${f(nx/Y*100)}%`],[['GDP',f(Y)],['Net exports',f(nx)]],'']});

add(B,'Inflation, real value & real interest rate','inflation cpi price index real interest fisher purchasing power',['p0|CPI (base period)|120','p1|CPI (current period)|132','i|Nominal interest rate % (optional)|12|o'],v=>{
 const inf=(v.p1-v.p0)/v.p0*100,st=[`Inflation = (CPI1 − CPI0) ÷ CPI0 × 100 = (${f(v.p1)} − ${f(v.p0)}) ÷ ${f(v.p0)} × 100 = ${f(inf)}%`,`Purchasing power of money changes by ${f((v.p0/v.p1-1)*100)}%`],an=[['Inflation rate',f(inf)+'%']];
 if(!isNaN(v.i)){const r=((1+v.i/100)/(1+inf/100)-1)*100;st.push(`Real interest (approx.) = i − π = ${f(v.i-inf)}%`,`Real interest (exact Fisher) = (1 + i) ÷ (1 + π) − 1 = ${f(r)}%`);an.push(['Real interest rate (exact)',f(r)+'%'])}
 return[['π = (CPI1 − CPI0) ÷ CPI0 × 100','1 + r = (1 + i) ÷ (1 + π)'],st,an,'']});

add(B,'Growth rate, CAGR & doubling time','growth rate cagr compound annual doubling time rule of 70',['s|Starting value (e.g. GDP)|1000','e|Ending value|1600','n|Number of years|8'],v=>{
 const g=Math.pow(v.e/v.s,1/v.n)-1,tot=(v.e/v.s-1)*100;
 return[['CAGR = (End ÷ Start)^(1 ÷ n) − 1','Doubling time = ln 2 ÷ ln(1 + g)'],[`Total growth = (${f(v.e)} − ${f(v.s)}) ÷ ${f(v.s)} × 100 = ${f(tot)}%`,`CAGR = (${f(v.e)} ÷ ${f(v.s)})^(1 ÷ ${f(v.n)}) − 1 = ${f(g*100)}% per year`,`Doubling time (exact) = ${f(Math.log(2)/Math.log(1+g))} years; rule of 70: 70 ÷ ${f(g*100)} = ${f(70/(g*100))} years`],[['Annual compound growth',f(g*100)+'%'],['Total growth',f(tot)+'%']],'']});

add(B,'Keynesian multiplier & equilibrium income','keynesian multiplier mpc consumption equilibrium income autonomous government spending tax',['a|Autonomous consumption a (C = a + bYd)|200','b|MPC b|0.8','I|Investment I|300','G|Government spending G|400','T|Lump-sum tax T|300','dG|Change in G (optional)|50|o'],v=>{
 const{a,b,I,G,T,dG}=v,k=1/(1-b),A0=a-b*T+I+G,Y=A0*k,Cn=a+b*(Y-T),S=Y-T-Cn;
 const st=[`Y = C + I + G = ${f(a)} + ${f(b)}(Y − ${f(T)}) + ${f(I)} + ${f(G)}`,`Y(1 − b) = a − bT + I + G = ${f(A0)}`,`Y* = ${f(A0)} ÷ ${f(1-b)} = ${f(Y)}`,`C = ${f(Cn)}; saving S = Y − T − C = ${f(S)}`,`Check: I + G = ${f(I+G)} and S + T = ${f(S+T)}`,`Spending multiplier = 1 ÷ (1 − b) = ${f(k)}; tax multiplier = −b ÷ (1 − b) = ${f(-b*k)}`],an=[['Equilibrium income Y*',f(Y)],['Spending multiplier',f(k)],['Tax multiplier',f(-b*k)]];
 if(!isNaN(dG)){st.push(`ΔY = k × ΔG = ${f(k)} × ${f(dG)} = ${f(k*dG)}`);an.push(['Change in income',f(k*dG)])}
 return[['Y* = (a − bT + I + G) ÷ (1 − b)','k = 1 ÷ (1 − b)'],st,an,'']});

add(gM,'Money multiplier & deposit creation','money multiplier reserve ratio deposit creation banking currency base',['rr|Reserve ratio %|10','H|Monetary base / initial deposit|1000','cr|Currency-to-deposit ratio % (optional)|0|o'],v=>{
 const r=v.rr/100,c=isNaN(v.cr)?0:v.cr/100,m=(1+c)/(r+c),M=m*v.H;
 return[['m = (1 + c) ÷ (rr + c); with no cash leakage m = 1 ÷ rr'],[`m = (1 + ${f(c)}) ÷ (${f(r)} + ${f(c)}) = ${f(m)}`,`Money supply = m × H = ${f(m)} × ${f(v.H)} = ${f(M)}`,`Initial deposit ${f(v.H)} can expand total deposits up to ${f(v.H/r)} when there is no cash leakage`],[['Money multiplier',f(m)],['Money supply',f(M)]],'']});

add(gM,'Quantity theory of money (MV = PY)','quantity theory money velocity price level equation exchange',['M|Money supply M|2000|o','V|Velocity V|5|o','P|Price level P|2|o','Y|Real output Y|5000|o'],v=>{
 const k=['M','V','P','Y'].filter(x=>isNaN(v[x]));if(k.length!==1)throw'Leave exactly one of M, V, P, Y empty: that is the value to find.';
 const u=k[0],R={M:v.P*v.Y/v.V,V:v.P*v.Y/v.M,P:v.M*v.V/v.Y,Y:v.M*v.V/v.P}[u],F={M:'M = PY ÷ V',V:'V = PY ÷ M',P:'P = MV ÷ Y',Y:'Y = MV ÷ P'}[u];
 return[['MV = PY'],[`Unknown: ${u}`,`Rearrange: ${F}`,`${u} = ${f(R)}`],[[u,f(R)]],'']});

add(B,'Solow growth model (steady state)','solow growth steady state capital per worker saving golden rule depreciation',['s|Saving rate %|20','n|Population growth %|1','dl|Depreciation rate %|5','al|Capital share α|0.33','A|Productivity A (optional, default 1)|1|o'],v=>{
 const s=v.s/100,n=v.n/100,d=v.dl/100,al=v.al,A=isNaN(v.A)?1:v.A,k=Math.pow(s*A/(n+d),1/(1-al)),y=A*Math.pow(k,al),kg=Math.pow(al*A/(n+d),1/(1-al)),cg=A*Math.pow(kg,al)-(n+d)*kg;
 return[['Steady state: s·A·k^α = (n + δ)·k','k* = [sA ÷ (n + δ)]^(1 ÷ (1 − α))'],[`k* = [${f(s)} × ${f(A)} ÷ ${f(n+d)}]^(1 ÷ ${f(1-al)}) = ${f(k)}`,`y* = A·k*^α = ${f(y)}`,`Consumption c* = (1 − s)·y* = ${f((1-s)*y)}; investment per worker = ${f(s*y)}`,`Golden-rule saving rate = α = ${f(al*100)}%, giving k = ${f(kg)} and c = ${f(cg)}`],[['Steady-state capital per worker',f(k)],['Steady-state output per worker',f(y)],['Consumption per worker',f((1-s)*y)]],s>al?'Saving exceeds the golden-rule rate: the economy is dynamically inefficient.':'Saving does not exceed the golden-rule rate.']});

add(gW,'Unemployment & labour force statistics','unemployment rate labour force participation employment population',['pop|Working-age population|10000','E|Employed|6000','U|Unemployed|500'],v=>{
 const L=v.E+v.U;
 return[['Labour force = E + U; u = U ÷ LF'],[`Labour force = ${f(v.E)} + ${f(v.U)} = ${f(L)}`,`Unemployment rate = ${f(v.U)} ÷ ${f(L)} × 100 = ${f(v.U/L*100)}%`,`Participation rate = ${f(L)} ÷ ${f(v.pop)} × 100 = ${f(L/v.pop*100)}%`,`Employment-population ratio = ${f(v.E/v.pop*100)}%`],[['Unemployment rate',f(v.U/L*100)+'%'],['Participation rate',f(L/v.pop*100)+'%']],'']});

add(C,'Exchange-rate change','exchange rate appreciation depreciation currency convert',['e0|Old rate (home currency per 1 foreign unit)|280','e1|New rate (home currency per 1 foreign unit)|300','amt|Foreign amount to convert (optional)|100|o'],v=>{
 const fc=(v.e1/v.e0-1)*100,hc=(v.e0/v.e1-1)*100,st=[`Foreign currency changes by (${f(v.e1)} − ${f(v.e0)}) ÷ ${f(v.e0)} × 100 = ${f(fc)}%`,`Home currency value changes by (${f(v.e0)} ÷ ${f(v.e1)} − 1) × 100 = ${f(hc)}%`],an=[['Foreign currency',(fc>=0?'appreciates ':'depreciates ')+f(Math.abs(fc))+'%'],['Home currency',(hc>=0?'appreciates ':'depreciates ')+f(Math.abs(hc))+'%']];
 if(!isNaN(v.amt)){st.push(`${f(v.amt)} foreign = ${f(v.amt*v.e0)} before and ${f(v.amt*v.e1)} after`);an.push(['Converted amount (new)',f(v.amt*v.e1)])}
 return[['% change = (new − old) ÷ old × 100'],st,an,v.e1>v.e0?'More home currency per foreign unit: the home currency has depreciated, which tends to raise exports and cut imports.':'The home currency has appreciated.']});

add(C,'Comparative advantage & terms of trade','comparative advantage absolute opportunity cost trade terms of trade ricardo',['ax|Country A: units of X per worker|10','ay|Country A: units of Y per worker|20','bx|Country B: units of X per worker|8','by|Country B: units of Y per worker|8'],v=>{
 const oa=v.ay/v.ax,ob=v.by/v.bx,lo=Math.min(oa,ob),hi=Math.max(oa,ob),x=oa<ob?'A':'B';
 return[['Opportunity cost of X = output of Y given up ÷ output of X gained'],[`A: 1 X costs ${f(v.ay)} ÷ ${f(v.ax)} = ${f(oa)} Y;  1 Y costs ${f(1/oa)} X`,`B: 1 X costs ${f(v.by)} ÷ ${f(v.bx)} = ${f(ob)} Y;  1 Y costs ${f(1/ob)} X`,`Lower opportunity cost of X: country ${x}, so ${x} specialises in X and ${x==='A'?'B':'A'} in Y`,`Absolute advantage: X → ${v.ax>v.bx?'A':v.ax<v.bx?'B':'none'}, Y → ${v.ay>v.by?'A':v.ay<v.by?'B':'none'}`,`Mutually beneficial terms of trade: between ${f(lo)} and ${f(hi)} units of Y per unit of X`],[['Comparative advantage in X',x],['Comparative advantage in Y',x==='A'?'B':'A'],['Terms of trade range (Y per X)',f(lo)+' to '+f(hi)]],'Trade is beneficial even if one country has an absolute advantage in both goods.']});

add(gN,'Simple vs compound interest, FV & PV','interest simple compound future value present value effective annual rate compounding',['P|Principal / amount|10000','r|Annual rate %|10','n|Years|5','m|Compounding periods per year (optional, default 1)|1|o'],v=>{
 if(isNaN(v.m))v.m=1;const r=v.r/100,si=v.P*(1+r*v.n),ci=v.P*Math.pow(1+r/v.m,v.m*v.n),ear=Math.pow(1+r/v.m,v.m)-1;
 return[['Simple: FV = P(1 + rn)','Compound: FV = P(1 + r/m)^(mn)','PV = FV ÷ (1 + r/m)^(mn)'],[`Simple interest FV = ${f(v.P)} × (1 + ${f(r)} × ${f(v.n)}) = ${f(si)}`,`Compound FV = ${f(v.P)} × (1 + ${f(r/v.m)})^${f(v.m*v.n)} = ${f(ci)}`,`Extra earned by compounding = ${f(ci-si)}`,`Effective annual rate = (1 + r/m)^m − 1 = ${f(ear*100)}%`,`Present value of ${f(v.P)} received in ${f(v.n)} years = ${f(v.P/Math.pow(1+r/v.m,v.m*v.n))}`],[['Simple-interest FV',f(si)],['Compound FV',f(ci)],['Effective annual rate',f(ear*100)+'%']],'']});

add(D,'Descriptive statistics','mean median mode variance standard deviation range statistics data dispersion',['x|Data values (comma separated)|12, 15, 15, 18, 20, 25|L'],v=>{
 const x=v.x,n=x.length,s=x.reduce((a,b)=>a+b,0),m=s/n,sr=[...x].sort((a,b)=>a-b),md=n%2?sr[(n-1)/2]:(sr[n/2-1]+sr[n/2])/2,ss=x.reduce((a,b)=>a+(b-m)*(b-m),0),fq={};x.forEach(a=>fq[a]=(fq[a]||0)+1);const mx=Math.max(...Object.values(fq)),mo=mx>1?Object.keys(fq).filter(k=>fq[k]===mx).join(', '):'no mode',pv=ss/n,sv=n>1?ss/(n-1):NaN;
 return[['Mean = Σx ÷ n','Variance = Σ(x − mean)² ÷ n (population) or ÷ (n − 1) (sample)'],[`n = ${n}; Σx = ${f(s)}; mean = ${f(m)}`,`Sorted data: ${sr.join(', ')}; median = ${f(md)}; mode = ${mo}`,`Σ(x − mean)² = ${f(ss)}`,`Population variance = ${f(pv)}; SD = ${f(Math.sqrt(pv))}`,`Sample variance = ${f(sv)}; SD = ${f(Math.sqrt(sv))}`,`Range = ${f(sr[n-1])} − ${f(sr[0])} = ${f(sr[n-1]-sr[0])}; coefficient of variation = ${f(Math.sqrt(sv)/m*100)}%`],[['Mean',f(m)],['Median',f(md)],['Mode',mo],['Sample standard deviation',f(Math.sqrt(sv))]],'']});

add(D,'Simple linear regression & correlation','regression correlation least squares slope intercept r squared econometrics line of best fit',['x|X values (comma separated)|1, 2, 3, 4, 5|L','y|Y values (comma separated)|2, 4, 5, 4, 5|L'],v=>{
 const x=v.x,y=v.y,n=x.length;if(n!==y.length||n<2)throw'X and Y must have the same number of values (at least 2).';
 const sx=x.reduce((a,b)=>a+b,0),sy=y.reduce((a,b)=>a+b,0),sxy=x.reduce((a,b,i)=>a+b*y[i],0),sxx=x.reduce((a,b)=>a+b*b,0),syy=y.reduce((a,b)=>a+b*b,0),den=n*sxx-sx*sx;if(den===0)throw'All X values are equal, so a slope cannot be found.';
 const b=(n*sxy-sx*sy)/den,a=sy/n-b*sx/n,r=(n*sxy-sx*sy)/Math.sqrt(den*(n*syy-sy*sy)),st=[`n = ${n}; ΣX = ${f(sx)}; ΣY = ${f(sy)}; ΣXY = ${f(sxy)}; ΣX² = ${f(sxx)}; ΣY² = ${f(syy)}`,`Slope b = (nΣXY − ΣXΣY) ÷ (nΣX² − (ΣX)²) = ${f(n*sxy-sx*sy)} ÷ ${f(den)} = ${f(b)}`,`Intercept a = Ȳ − b·X̄ = ${f(sy/n)} − ${f(b)} × ${f(sx/n)} = ${f(a)}`,`Fitted line: Ŷ = ${f(a)} + ${f(b)}X`,`Correlation r = ${f(r)}; R² = ${f(r*r)}`],an=[['Slope b',f(b)],['Intercept a',f(a)],['Correlation r',f(r)],['R²',f(r*r)]];
 if(!isNaN(v.x0)){st.push(`Prediction at X = ${f(v.x0)}: Ŷ = ${f(a+b*v.x0)}`);an.push(['Predicted Y',f(a+b*v.x0)])}
 return[['b = (nΣXY − ΣXΣY) ÷ (nΣX² − (ΣX)²);  a = Ȳ − b·X̄'],st,an,`${f(r*r*100)}% of the variation in Y is explained by X.`]});

add(E,'Mudarabah profit & loss sharing','mudarabah profit sharing loss investor mudarib islamic partnership ratio',['K|Capital provided by investor|50000','sh|Investor share of profit %|60','res|Result of the venture (profit +, loss −)|12000'],v=>{
 const r=v.res;if(r>=0){const i=r*v.sh/100;
  return[['Profit is shared at the agreed ratio'],[`Investor share = ${f(r)} × ${f(v.sh)}% = ${f(i)}`,`Mudarib (manager) share = ${f(r)} × ${f(100-v.sh)}% = ${f(r-i)}`,`Return on investor capital = ${f(i)} ÷ ${f(v.K)} × 100 = ${f(i/v.K*100)}%`],[['Investor profit',f(i)],['Mudarib profit',f(r-i)],['Investor return on capital',f(i/v.K*100)+'%']],'Profit ratios must be agreed in advance as percentages, not fixed sums.']}
 return[['Financial loss is borne by the capital provider'],[`Loss = ${f(-r)}`,`The investor bears the whole financial loss: ${f(-r)} (${f(-r/v.K*100)}% of capital)`,`The mudarib loses his time and effort and earns no profit share`],[['Investor loss',f(-r)],['Mudarib financial loss','0 (loses effort only)']],'If the loss comes from the mudarib’s negligence or breach, he becomes liable.']});

add(E,'Zakat on wealth','zakat nisab wealth islamic 2.5 percent due',['w|Zakatable assets (cash, gold, business stock...)','n|Nisab value in your currency','l|Short-term liabilities (optional)||o','r|Zakat rate % (optional, default 2.5)||o'],v=>{
 if(isNaN(v.r))v.r=2.5;const net=v.w-(isNaN(v.l)?0:v.l),due=net>=v.n,z=due?net*v.r/100:0;
 return[['Zakat = net zakatable wealth × 2.5% (if wealth ≥ nisab, held for one lunar year)'],[`Net zakatable wealth = ${f(v.w)} − ${f(isNaN(v.l)?0:v.l)} = ${f(net)}`,`Compare with nisab ${f(v.n)}: ${due?'wealth is at or above nisab, so zakat is due':'wealth is below nisab, so zakat is not due'}`,`Zakat = ${f(net)} × ${f(v.r)}% = ${f(z)}`],[['Net wealth',f(net)],['Zakat due',f(z)]],'Enter the current nisab (value of 87.48 g gold or 612.36 g silver) yourself; it changes with market prices. Check details with a scholar.']});


add(A,'Production function (Cobb-Douglas)','production cobb douglas output marginal product returns to scale labour capital mpl mpk',['A|Productivity A (Q = A·K^α·L^β)','al|Capital exponent α','be|Labour exponent β','K|Capital K','L|Labour L'],v=>{
 const{A:a0,al,be,K,L}=v,Q=a0*Math.pow(K,al)*Math.pow(L,be),mpk=al*Q/K,mpl=be*Q/L,s=al+be;
 return[['Q = A·K^α·L^β','MPL = β·Q ÷ L;  MPK = α·Q ÷ K'],[`Q = ${f(a0)} × ${f(K)}^${f(al)} × ${f(L)}^${f(be)} = ${f(Q)}`,`MPL = ${f(mpl)}; APL = Q ÷ L = ${f(Q/L)}`,`MPK = ${f(mpk)}; APK = Q ÷ K = ${f(Q/K)}`,`MRTS = MPL ÷ MPK = ${f(mpl/mpk)}`,`α + β = ${f(s)}`],[['Output Q',f(Q)],['MPL',f(mpl)],['MPK',f(mpk)],['Returns to scale',s>1?'Increasing':s<1?'Decreasing':'Constant']],'Returns to scale depend on α + β: above 1 increasing, equal to 1 constant, below 1 decreasing.']});

add(A,'Marginal revenue & point elasticity (linear demand)','marginal revenue total revenue point elasticity linear demand price',['a|Demand intercept a (P = a − bQ)','b|Demand slope b||p','Q|Quantity Q'],v=>{
 const{a,b,Q}=v,P=a-b*Q,tr=P*Q,mr=a-2*b*Q,e=-(P/Q)/b;
 return[['P = a − bQ;  TR = P·Q;  MR = a − 2bQ;  E = −(1 ÷ b)(P ÷ Q)'],[`P = ${f(a)} − ${f(b)} × ${f(Q)} = ${f(P)}`,`TR = P × Q = ${f(tr)}`,`MR = a − 2bQ = ${f(mr)}`,`Point elasticity E = −(1 ÷ ${f(b)}) × (${f(P)} ÷ ${f(Q)}) = ${f(e)}`,`TR is maximised at Q = a ÷ 2b = ${f(a/(2*b))}, where MR = 0`],[['Price',f(P)],['Total revenue',f(tr)],['Marginal revenue',f(mr)],['Point elasticity',f(e)]],Math.abs(e)>1?'Elastic here (MR > 0): cutting the price raises revenue.':Math.abs(e)<1?'Inelastic here (MR < 0): cutting the price lowers revenue.':'Unit elastic: revenue is at its maximum.']});

add(B,'Open-economy multiplier (taxes & imports)','open economy multiplier imports marginal propensity import tax rate trade balance budget',['a|Autonomous consumption a','b|MPC b (decimal)','t|Income tax rate t (decimal)','m|Marginal propensity to import m (decimal)','I|Investment I','G|Government spending G','X|Exports X','M0|Autonomous imports'],v=>{
 const{a,b,t,m,I,G,X,M0}=v,den=1-b*(1-t)+m,k=1/den,Y=(a+I+G+X-M0)*k,tb=X-M0-m*Y,bb=t*Y-G;
 return[['Y = C + I + G + X − M, with C = a + b(1 − t)Y and M = M0 + mY','k = 1 ÷ [1 − b(1 − t) + m]'],[`Y[1 − b(1 − t) + m] = a + I + G + X − M0 = ${f(a+I+G+X-M0)}`,`Denominator = ${f(den)}; multiplier k = ${f(k)}`,`Y* = ${f(a+I+G+X-M0)} × ${f(k)} = ${f(Y)}`,`Imports = ${f(M0+m*Y)}; trade balance = X − M = ${f(tb)}`,`Tax revenue = tY = ${f(t*Y)}; budget balance = tY − G = ${f(bb)}`],[['Equilibrium income',f(Y)],['Multiplier',f(k)],['Trade balance',f(tb)],['Budget balance',f(bb)]],'Taxes and imports leak out of the spending stream, so this multiplier is smaller than the simple 1 ÷ (1 − b).']});

add(B,'Inflationary & deflationary gap','inflationary gap deflationary gap full employment output gap multiplier',['Y|Equilibrium income Y','Yf|Full-employment income Yf','mpc|MPC (decimal)'],v=>{
 const k=1/(1-v.mpc),d=v.Yf-v.Y,ad=d/k;
 return[['k = 1 ÷ (1 − MPC);  required change in spending = income gap ÷ k'],[`Multiplier k = 1 ÷ (1 − ${f(v.mpc)}) = ${f(k)}`,`Income gap = Yf − Y = ${f(v.Yf)} − ${f(v.Y)} = ${f(d)}`,`Change in aggregate demand needed = ${f(d)} ÷ ${f(k)} = ${f(ad)}`],[[d>0?'Deflationary (recessionary) gap':d<0?'Inflationary gap':'No gap',f(Math.abs(ad))+' of spending']],d>0?'Aggregate demand must rise by this amount to reach full employment.':d<0?'Aggregate demand must fall by this amount to remove inflationary pressure.':'The economy is at full employment.']});

add(B,'National income aggregates (GNP, NNP, NI, PI, DPI)','national income gnp nnp factor cost market price depreciation indirect tax subsidies personal disposable income',['gdp|GDP at market price','nfia|Net factor income from abroad','dep|Depreciation','it|Indirect taxes','sb|Subsidies','ret|Undistributed profit + corporate tax (optional)||o','tr|Transfer payments (optional)||o','pt|Personal direct taxes (optional)||o'],v=>{
 const gnp=v.gdp+v.nfia,nnp=gnp-v.dep,ni=nnp-v.it+v.sb,gfc=v.gdp-v.it+v.sb,z=x=>isNaN(x)?0:x,st=[`GNP(mp) = GDP + NFIA = ${f(v.gdp)} + ${f(v.nfia)} = ${f(gnp)}`,`NNP(mp) = GNP − depreciation = ${f(nnp)}`,`National income = NNP(fc) = NNP(mp) − indirect taxes + subsidies = ${f(ni)}`,`GDP(fc) = GDP(mp) − indirect taxes + subsidies = ${f(gfc)}`],an=[['GNP at market price',f(gnp)],['NNP at market price',f(nnp)],['National income (NNP at factor cost)',f(ni)],['GDP at factor cost',f(gfc)]];
 if(!(isNaN(v.ret)&&isNaN(v.tr)&&isNaN(v.pt))){const pi=ni-z(v.ret)+z(v.tr),dpi=pi-z(v.pt);st.push(`Personal income = NI − undistributed profit and corporate tax + transfers = ${f(pi)}`,`Disposable income = PI − personal direct taxes = ${f(dpi)}`);an.push(['Personal income',f(pi)],['Disposable income',f(dpi)])}
 return[['GNP = GDP + NFIA;  NNP = GNP − D;  NI = NNP(mp) − indirect taxes + subsidies'],st,an,'']});

add(C,'Tariff: effects on welfare (small country)','tariff import duty welfare consumer surplus producer deadweight small country protection',['a|Demand intercept a (Qd = a − bP)','b|Demand slope b||p','c|Supply intercept c (Qs = c + dP)','d|Supply slope d||p','pw|World price Pw','t|Tariff rate %'],v=>{
 const{a,b,c,d,pw,t}=v,pt=pw*(1+t/100),qd0=a-b*pw,qs0=c+d*pw,qd1=a-b*pt,qs1=c+d*pt,m0=qd0-qs0,m1=qd1-qs1,dc=(qd0+qd1)/2*(pt-pw),dp=(qs0+qs1)/2*(pt-pw),rev=(pt-pw)*m1,dw=dc-dp-rev;
 return[['Domestic price with tariff = Pw(1 + t)','DWL = loss in consumer surplus − gain in producer surplus − tariff revenue'],[`Price with tariff = ${f(pw)} × (1 + ${f(t/100)}) = ${f(pt)}`,`Free trade: Qd = ${f(qd0)}, Qs = ${f(qs0)}, imports = ${f(m0)}`,`With tariff: Qd = ${f(qd1)}, Qs = ${f(qs1)}, imports = ${f(m1)}`,`Loss of consumer surplus = ${f(dc)}`,`Gain of producer surplus = ${f(dp)}`,`Tariff revenue = ${f(pt-pw)} × ${f(m1)} = ${f(rev)}`,`Deadweight loss = ${f(dc)} − ${f(dp)} − ${f(rev)} = ${f(dw)}`],[['Domestic price with tariff',f(pt)],['Imports after tariff',f(m1)],['Tariff revenue',f(rev)],['Deadweight loss',f(dw)]],'Consumers lose more than producers and the government gain together, so the country as a whole is worse off.']});

add(gP,'Progressive income tax (slabs)','income tax slab bracket progressive marginal average tax rate salary',['inc|Taxable income (write it first)','sl|Slabs as pairs: starts-at amount, rate %||L'],v=>{
 const p=v.sl;if(p.length%2)throw'Write the slabs as pairs: the amount where the slab starts, then its rate %.';
 const s=[];for(let i=0;i<p.length;i+=2)s.push([p[i],p[i+1]]);s.sort((x,y)=>x[0]-y[0]);
 let tot=0,mr=0;const st=[];
 s.forEach((x,i)=>{const hi=i+1<s.length?s[i+1][0]:Infinity,tx=Math.max(0,Math.min(v.inc,hi)-x[0]),tax=tx*x[1]/100;if(v.inc>x[0])mr=x[1];tot+=tax;if(tx>0)st.push(`Slab from ${f(x[0])}${hi===Infinity?' and above':' to '+f(hi)} at ${f(x[1])}%: ${f(tx)} × ${f(x[1])}% = ${f(tax)}`)});
 st.push(`Total tax = ${f(tot)}`,`Average rate = ${f(tot)} ÷ ${f(v.inc)} × 100 = ${f(tot/v.inc*100)}%`,`Marginal rate = ${f(mr)}%`);
 return[['Tax = Σ (income falling in each slab × that slab’s rate)'],st,[['Total tax',f(tot)],['Average rate',f(tot/v.inc*100)+'%'],['Marginal rate',f(mr)+'%'],['Income after tax',f(v.inc-tot)]],'Slab limits and rates change with each budget, so use the slabs from the current tax law.']});

add(gP,'Fiscal deficit, primary deficit & debt ratios','fiscal deficit primary deficit debt gdp ratio budget revenue expenditure interest',['rev|Total revenue','ex|Total expenditure','ip|Interest payments','gdp|GDP','debt|Public debt (optional)||o'],v=>{
 const d=v.ex-v.rev,pd=d-v.ip,st=[`Fiscal deficit = expenditure − revenue = ${f(v.ex)} − ${f(v.rev)} = ${f(d)}`,`Primary deficit = fiscal deficit − interest = ${f(pd)}`,`Fiscal deficit = ${f(d/v.gdp*100)}% of GDP; primary deficit = ${f(pd/v.gdp*100)}% of GDP`,`Interest payments = ${f(v.ip/v.rev*100)}% of revenue`],an=[['Fiscal deficit',f(d)],['Primary deficit',f(pd)],['Fiscal deficit % of GDP',f(d/v.gdp*100)+'%']];
 if(!isNaN(v.debt)){st.push(`Debt-to-GDP = ${f(v.debt)} ÷ ${f(v.gdp)} × 100 = ${f(v.debt/v.gdp*100)}%`);an.push(['Debt-to-GDP',f(v.debt/v.gdp*100)+'%'])}
 return[['Fiscal deficit = expenditure − revenue;  primary deficit = fiscal deficit − interest'],st,an,pd>0?'A primary deficit means the government borrows even before paying interest.':'A primary surplus means revenue covers non-interest spending.']});

add(gV,'Gini coefficient (income inequality)','gini coefficient inequality income distribution lorenz',['x|Incomes of all individuals or groups||L'],v=>{
 const x=[...v.x].sort((a,b)=>a-b),n=x.length,s=x.reduce((a,b)=>a+b,0),w=x.reduce((a,b,i)=>a+(2*(i+1)-n-1)*b,0),G=w/(n*s);
 return[['G = Σ(2i − n − 1)·xi ÷ (n·Σx), incomes sorted from smallest (i = 1) to largest'],[`Sorted incomes: ${x.join(', ')}`,`n = ${n}; Σx = ${f(s)}`,`Σ(2i − n − 1)·xi = ${f(w)}`,`G = ${f(w)} ÷ (${n} × ${f(s)}) = ${f(G)}`,`The richest one holds ${f(x[n-1]/s*100)}% of total income`],[['Gini coefficient',f(G)]],'0 means perfect equality; 1 means one person has all the income.']});

add(gV,'Harrod-Domar growth model','harrod domar growth saving capital output ratio investment required',['s|Saving rate %','v|Capital-output ratio (K ÷ Y)','g|Target growth rate % (optional)||o'],v=>{
 const g=v.s/v.v,st=[`g = s ÷ v = ${f(v.s)}% ÷ ${f(v.v)} = ${f(g)}%`],an=[['Growth rate',f(g)+'%']];
 if(!isNaN(v.g)){const sr=v.g*v.v;st.push(`Saving needed for ${f(v.g)}% growth: s = g × v = ${f(sr)}%`);an.push(['Required saving rate',f(sr)+'%'])}
 return[['g = s ÷ v  (growth = saving rate ÷ capital-output ratio)'],st,an,'A higher capital-output ratio means a country needs more saving to grow at the same speed.']});

add(gW,"Okun's law (output gap)",'okun law output gap unemployment natural rate cyclical',['u|Actual unemployment rate %','un|Natural unemployment rate %','be|Okun coefficient β (often about 2)','y|Potential output (optional)||o'],v=>{
 const g=-v.be*(v.u-v.un),st=[`Output gap % = −β × (u − natural u) = −${f(v.be)} × (${f(v.u)} − ${f(v.un)}) = ${f(g)}%`],an=[['Output gap',f(g)+'% of potential output']];
 if(!isNaN(v.y)){st.push(`Output gap in value = ${f(g)}% × ${f(v.y)} = ${f(g*v.y/100)}`);an.push(['Output gap (value)',f(g*v.y/100)])}
 return[['(Y − Y*) ÷ Y* = −β × (u − natural u)'],st,an,g<0?'Actual output is below potential (recession gap).':g>0?'Actual output is above potential (overheating).':'Output is at its potential.']});

add(gG,'Nash equilibrium (2×2 game)','nash equilibrium game theory payoff matrix prisoners dilemma dominant strategy mixed',['tlr|Top-Left: row player payoff','tlc|Top-Left: column player payoff','trr|Top-Right: row player payoff','trc|Top-Right: column player payoff','blr|Bottom-Left: row player payoff','blc|Bottom-Left: column player payoff','brr|Bottom-Right: row player payoff','brc|Bottom-Right: column player payoff'],v=>{
 const{tlr,tlc,trr,trc,blr,blc,brr,brc}=v,ne=[];
 if(tlr>=blr&&tlc>=trc)ne.push('(Top, Left)');if(trr>=brr&&trc>=tlc)ne.push('(Top, Right)');if(blr>=tlr&&blc>=brc)ne.push('(Bottom, Left)');if(brr>=trr&&brc>=blc)ne.push('(Bottom, Right)');
 const dr=tlr>blr&&trr>brr?'Top':blr>tlr&&brr>trr?'Bottom':'none',dc=tlc>trc&&blc>brc?'Left':trc>tlc&&brc>blc?'Right':'none',d1=tlc-blc-trc+brc,d2=tlr-trr-blr+brr,p=(brc-blc)/d1,q=(brr-trr)/d2,mx=d1!==0&&d2!==0&&p>0&&p<1&&q>0&&q<1;
 const st=[`Payoffs (row, column): Top-Left (${f(tlr)}, ${f(tlc)}); Top-Right (${f(trr)}, ${f(trc)}); Bottom-Left (${f(blr)}, ${f(blc)}); Bottom-Right (${f(brr)}, ${f(brc)})`,`A cell is a pure Nash equilibrium if neither player gains by switching alone`,`Pure Nash equilibria: ${ne.length?ne.join(', '):'none'}`,`Dominant strategy: row player → ${dr}; column player → ${dc}`];
 if(mx)st.push(`Mixed equilibrium: row plays Top with probability ${f(p)}; column plays Left with probability ${f(q)}`);
 return[['Best-response check for each cell; mixed: make the other player indifferent'],st,[['Pure Nash equilibria',ne.length?ne.join(', '):'none'],['Row dominant strategy',dr],['Column dominant strategy',dc],['Mixed equilibrium',mx?`p(Top) = ${f(p)}, q(Left) = ${f(q)}`:'none']],'']});

add(D,'Index numbers (Laspeyres, Paasche, Fisher)','index number laspeyres paasche fisher price index base year weighted',['p0|Base-year prices||L','q0|Base-year quantities||L','p1|Current-year prices||L','q1|Current-year quantities||L'],v=>{
 const S=(a,b)=>a.reduce((s,x,i)=>s+x*b[i],0),a=S(v.p1,v.q0),b=S(v.p0,v.q0),c=S(v.p1,v.q1),d=S(v.p0,v.q1),L=a/b*100,Pa=c/d*100,Fi=Math.sqrt(L*Pa);
 return[['Laspeyres = Σp1q0 ÷ Σp0q0 × 100;  Paasche = Σp1q1 ÷ Σp0q1 × 100;  Fisher = √(L × P)'],[`Σp1q0 = ${f(a)}; Σp0q0 = ${f(b)} → Laspeyres = ${f(L)}`,`Σp1q1 = ${f(c)}; Σp0q1 = ${f(d)} → Paasche = ${f(Pa)}`,`Fisher = √(${f(L)} × ${f(Pa)}) = ${f(Fi)}`],[['Laspeyres index',f(L)],['Paasche index',f(Pa)],['Fisher index',f(Fi)]],'Prices rose by about '+f(Fi-100)+'% between the two years (Fisher index).']});

add(gN,'Loan instalment (EMI)','emi loan instalment monthly payment mortgage interest amortisation',['P|Loan amount','r|Annual interest rate %','y|Loan term in years'],v=>{
 const r=v.r/1200,n=v.y*12,emi=r===0?v.P/n:v.P*r*Math.pow(1+r,n)/(Math.pow(1+r,n)-1),tot=emi*n;
 return[['EMI = P·r·(1 + r)^n ÷ [(1 + r)^n − 1];  r = annual rate ÷ 12;  n = months'],[`Monthly rate r = ${f(v.r)}% ÷ 12 = ${f(r*100)}%; n = ${f(n)} months`,`EMI = ${f(emi)}`,`Total payment = EMI × n = ${f(tot)}`,`Total interest = ${f(tot-v.P)}`],[['Monthly instalment (EMI)',f(emi)],['Total payment',f(tot)],['Total interest',f(tot-v.P)]],'']});

add(gN,'NPV, IRR & payback','npv irr net present value discount rate cash flows payback project investment appraisal',['r|Discount rate % (write it first)','cf|Cash flows starting with year 0 (investment is negative)||L'],v=>{
 const r=v.r/100,c=v.cf,N=k=>c.reduce((s,x,t)=>s+x/Math.pow(1+k,t),0),npv=N(r);let lo=-0.99,hi=10,irr=NaN;
 if(N(lo)*N(hi)<0){for(let i=0;i<200;i++){const m=(lo+hi)/2;if(N(lo)*N(m)<=0)hi=m;else lo=m}irr=(lo+hi)/2}
 let cum=0,pb='not recovered within the given years';for(let t=0;t<c.length;t++){const pr=cum;cum+=c[t];if(t>0&&pr<0&&cum>=0){pb=f(t-1+(-pr)/c[t])+' years';break}}
 return[['NPV = Σ CFt ÷ (1 + r)^t;  IRR is the rate that makes NPV = 0'],[...c.map((x,t)=>`Year ${t}: ${f(x)} ÷ (1 + ${f(r)})^${t} = ${f(x/Math.pow(1+r,t))}`),`NPV = sum of present values = ${f(npv)}`,`IRR = ${isNaN(irr)?'not found (cash flows never change sign)':f(irr*100)+'%'}`,`Payback period = ${pb}`],[['NPV',f(npv)],['IRR',isNaN(irr)?'n/a':f(irr*100)+'%'],['Payback',pb]],npv>0?'NPV is positive: the project adds value at this discount rate, so accept it.':npv<0?'NPV is negative: reject the project at this discount rate.':'NPV is zero: indifferent.']});

add(E,'Musharakah profit & loss sharing','musharakah partnership profit loss sharing capital ratio islamic joint venture',['res|Total result (profit +, loss −)','cap|Capital of each partner||L','rat|Agreed profit ratio of each partner, same order||L'],v=>{
 const r=v.res,c=v.cap,q=v.rat,sc=c.reduce((a,b)=>a+b,0),sq=q.reduce((a,b)=>a+b,0),st=[],an=[];
 c.forEach((x,i)=>{if(r>=0){const s=r*q[i]/sq;st.push(`Partner ${i+1} profit = ${f(r)} × ${f(q[i])} ÷ ${f(sq)} = ${f(s)}`);an.push(['Partner '+(i+1)+' profit',f(s)])}else{const s=-r*x/sc;st.push(`Partner ${i+1} loss = ${f(-r)} × ${f(x)} ÷ ${f(sc)} = ${f(s)}`);an.push(['Partner '+(i+1)+' loss',f(s)])}});
 return[[r>=0?'Profit is shared by the agreed ratio':'Loss is shared strictly in proportion to capital'],st,an,'In Musharakah profit follows the agreed ratio, but loss must follow capital contribution exactly.']});

add(E,'Murabaha (cost-plus financing)','murabaha cost plus markup installment islamic financing sale price',['cost|Asset cost to the bank','mk|Mark-up % on cost','mo|Number of monthly instalments','dp|Down payment (optional)||o'],v=>{
 const sp=v.cost*(1+v.mk/100),dp=isNaN(v.dp)?0:v.dp,fin=sp-dp,ins=fin/v.mo;
 return[['Selling price = cost × (1 + mark-up);  instalment = (price − down payment) ÷ months'],[`Selling price = ${f(v.cost)} × (1 + ${f(v.mk/100)}) = ${f(sp)}`,`Bank profit = ${f(sp-v.cost)}`,`Amount financed = ${f(sp)} − ${f(dp)} = ${f(fin)}`,`Monthly instalment = ${f(fin)} ÷ ${f(v.mo)} = ${f(ins)}`],[['Selling price',f(sp)],['Bank profit',f(sp-v.cost)],['Monthly instalment',f(ins)]],'The price is fixed when the sale is made and cannot rise if the customer pays late.']});

/* ====== PAGE LOGIC ====== */
const ORDER=[A,B,C,gM,gP,gV,gW,gG,D,gN,E],cats=ORDER.filter(g=>T.some(t=>t.g===g)),AUTO='Auto-detect the topic for me';
const HINT={
 'Quantity theory of money (MV = PY)':'Write the three known values like M=2000, V=5, Y=5000. Leave out the one you want to find.',
 'Simple linear regression & correlation':'Write all X values first, then all Y values (same count), e.g. X: 1 2 3 4 5 and Y: 2 4 5 4 5.',
 'Index numbers (Laspeyres, Paasche, Fisher)':'Write base-year prices, base-year quantities, current-year prices, current-year quantities (same number of goods in each).',
 'Musharakah profit & loss sharing':'Write the total profit or loss first (loss as a negative number), then every partner’s capital, then every partner’s profit ratio.',
 'Progressive income tax (slabs)':'Write the income first, then each slab as a pair: starts-at amount and rate %, e.g. 0, 0, 600000, 5, 1200000, 15.',
 'NPV, IRR & payback':'Write the discount rate % first, then all cash flows starting with year 0 (the investment as a negative number).',
 'Descriptive statistics':'Write all the data values in your question, separated by commas or spaces.',
 'Gini coefficient (income inequality)':'Write the income of every individual or group, separated by commas or spaces.'};
const PARSE={'Quantity theory of money (MV = PY)':q=>{const v={};['M','V','P','Y'].forEach(k=>{const m=q.match(new RegExp('(?:^|[^A-Za-z])'+k+'\\s*[=:]\\s*(-?[\\d.,]+)','i'));v[k]=m?Number(m[1].replace(/,/g,'')):NaN});return v}};
const nums=t=>{t=t.replace(/[−–—]/g,'-').replace(/\^\s*[23](?![\d.])/g,'').replace(/\d{1,3}(?:,\d{3})+(?!\d)/g,m=>m.replace(/,/g,''));return(t.match(/(?<![A-Za-z\d.])-?\d+(?:\.\d+)?/g)||[]).map(Number)};
const cur=()=>$('cat').value===AUTO?null:T[$('top').value];
const ordTxt=t=>t.fl.map((x,i)=>(i+1)+') '+x.l+(x.o?' (optional)':'')).join('  ·  ');
const err=m=>{$('out').innerHTML='<div class="err">'+esc(m&&m.message?m.message:m)+'</div>'};
function hint(){const t=cur();$('hint').textContent=t?(HINT[t.n]||'Write the numbers in your question in this order: '+ordTxt(t)):'The page picks the topic from keywords in your question and reads its numbers in that topic’s order. Always check the “Given” line in the answer.'}
function fillTopics(){const a=$('cat').value===AUTO;$('top').disabled=a;$('top').innerHTML=a?'<option>Chosen automatically</option>':T.map((t,i)=>t.g===$('cat').value?`<option value="${i}">${esc(t.n)}</option>`:'').join('');hint();$('out').innerHTML=''}
function pick(q){q=q.toLowerCase();let b=null,bs=0;T.forEach(t=>{const s=t.kw.split(' ').filter(w=>q.includes(w)).length;if(s>bs){bs=s;b=t}});return b}
function extract(t,q){
 if(PARSE[t.n])return PARSE[t.n](q);
 const n=nums(q),sc=t.fl.filter(x=>!x.L),ls=t.fl.filter(x=>x.L),need=sc.filter(x=>!x.o).length+ls.length,v={};
 if(n.length<need)throw`I found ${n.length} number(s) in your question, but this topic needs at least ${need}. `+(HINT[t.n]||'Numbers are read in this order: '+ordTxt(t));
 let i=0;sc.forEach(x=>{v[x.k]=i<n.length?n[i++]:NaN;if(x.p&&!isNaN(v[x.k]))v[x.k]=Math.abs(v[x.k])});
 const rest=n.slice(i);
 if(ls.length===1)v[ls[0].k]=rest;
 else if(ls.length){if(!rest.length||rest.length%ls.length)throw`The numbers after the single values must split into ${ls.length} equal lists, but ${rest.length} were found. `+(HINT[t.n]||'');const m=rest.length/ls.length;ls.forEach((x,j)=>v[x.k]=rest.slice(j*m,(j+1)*m))}
 else if(rest.length)v._extra=rest.length;
 return v}
function go(){const q=$('q').value;if(!q.trim())return err('Please type your numerical question first.');
 let t=cur();if(!t){t=pick(q);if(!t)return err('I could not recognise the topic from your question. Please choose a branch and a topic.')}
 try{const v=extract(t,q),[fm,st,an,nt]=t.s(v),given=t.fl.filter(x=>x.L?v[x.k]&&v[x.k].length:!isNaN(v[x.k])).map(x=>x.l+' = '+(x.L?v[x.k].map(f).join(', '):f(v[x.k]))).join('  ·  ');
  $('out').innerHTML=`<div class="res"><h3>${esc(t.n)}</h3><h4>Given (read from your question)</h4><div>${esc(given)}</div>${v._extra?'<div class="note">'+v._extra+' extra number(s) in your question were not used.</div>':''}<h4>Formula</h4>${fm.map(l=>'<div>'+esc(l)+'</div>').join('')}<h4>Step-by-step solution</h4><ol>${st.map(l=>'<li>'+esc(l)+'</li>').join('')}</ol><h4>Final answer</h4><div class="ans">${an.map(a=>esc(a[0])+': '+esc(a[1])).join('<br>')}</div>${nt?'<div class="note"><b>Interpretation:</b> '+esc(nt)+'</div>':''}</div>`}
 catch(e){err(e)}}
function cp(){const t=$('out').innerText;if(t&&navigator.clipboard)navigator.clipboard.writeText(t)}
$('cat').innerHTML=cats.map(c=>`<option>${esc(c)}</option>`).join('')+`<option>${AUTO}</option>`;
$('q').addEventListener('keydown',e=>{if(e.ctrlKey&&e.key==='Enter')go()});
fillTopics();
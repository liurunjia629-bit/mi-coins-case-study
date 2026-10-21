(function(global){
  const rewards=[{id:'ali800',name:'AliExpress Card',face:800,cost:8000,asset:'a-img37D2B15E6Bbd405294137314D47Bd59B1.png',art:'small'},{id:'ali3000',name:'AliExpress Card',face:3000,cost:30000,asset:'a-imgImage8.png',art:'large'},{id:'recharge',name:'Recharge Card',face:20,cost:200,asset:'a-img262566D74Baf4E81815DE5Cb872434D71.png',art:'recharge'}];
  const tasks=[{id:'ml',name:'Mobile Legends: Bang Bang',status:'completed',reward:100},{id:'pubg',name:'PUBG Mobile',status:'progress',reward:100},{id:'cod',name:'Call of Duty',status:'new',reward:100},{id:'mono',name:'MONOPOLY GO!',status:'new',reward:100}];
  const initial=()=>({balance:8253,pubgDone:false});
  const goal=(state,id)=>{const reward=rewards.find(r=>r.id===id);return reward?{...reward,gap:Math.max(0,reward.cost-state.balance),progress:Math.min(100,state.balance/reward.cost*100)}:null;};
  const complete=state=>state.pubgDone?{...state}:{balance:state.balance+100,pubgDone:true};
  const api={rewards,tasks,initial,goal,complete};global.MiCoinsModel=api;if(typeof module!=='undefined')module.exports=api;
})(typeof window==='undefined'?globalThis:window);

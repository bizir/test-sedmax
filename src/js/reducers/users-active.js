let users = [1,2,3,4,5,6,7,8,9].map((i)=>(
	{
		id:i,
		name:`Название ${i}`,
		condition:(i%2)===0,
		email:`Name${i}@mail.ru`,
		addresses:[1,2].map((i1=>`Name${i}_${i1}@mail.ru`))
	})
)
export default function (state=null,action){
	switch(action.type){
		case "SAVE_USERS":
			let newUsers = action.payload;
			
			users = users.map(u=>{
				let index = newUsers.findIndex(u1=>u1.id===u.id);
				if(index!==-1){
					return newUsers[index];
				} else {
					return u;
				}
			})
			return users;
		default:
			return users;
	}
}

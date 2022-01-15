const faker = require('faker');
const boom = require('@hapi/boom');

class UsersService{
  constructor(){
    this.users = [];
    this.generate();
  }

  generate(){
    let limit = 5;
    for(let i=0; i<limit; i++){
      this.users.push({
        id: faker.datatype.uuid(),
        name: faker.name.firstName(),
        lastname: faker.name.lastName(),
        email: faker.internet.email(),
      })
    }
  }

  find(correct = true){
    return new Promise((resolve, reject)=>{
      if(!correct) reject(boom.internal('Error interno'));
      setTimeout(()=>{
        resolve(this.users);
      },2000);
    })
  }

  create(data){
    const {name, lastname, email} = data;
    const newUser = {
      id: faker.datatype.uuid(),
      name,
      lastname,
      email
    };
    this.users.push(newUser);
    return newUser;
  }

  delete(id){
    return new Promise((resolve, reject)=>{
      const index = this.users.findIndex(item=>item.id === id);
      if(index === -1) reject(boom.notFound('product not found'));
      this.users.splice(index,1);
      resolve({id})
    })
  }
}

module.exports = UsersService;

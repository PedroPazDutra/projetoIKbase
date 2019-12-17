
const pg = require('pg')

const config = {
    user: 'postgres', // env var: PGUSER
    database: 'talentos8', // env var: PGDATABASE
    password: 'Kbase1novar', // env var: PGPASSWORD
    host: '69.171.4.30', // Server hosting the postgres database
    port: 5432, // env var: PGPORT
    max: 100, // max number of clients in the pool
    idleTimeoutMillis: 30000 // how long a client is allowed to remain idle before being closed
  }

  const client = new pg.Client(config)

  async function insertUsuario(email, senha, nome, nascimento){
    try{
        client.connect()
        const insert  = `insert into usuario(email, senha, nome, nascimento) values('${email}', '${senha}', '${nome}', '${nascimento}')`
        await client.query(insert)
        client.end()
    }catch(e){
          console.log(e)
    } 
}

async function insertTopico(titulo, texto, criacao, username, tag){
  try{
      client.connect()
      const select =  `select id from usuario where nome = '${username}'`
      var id_usuario = await client.query(select)
      id_usuario = id_usuario.rows[0].id

  }catch(e){
    console.log(e)
  }
  try{
      const insert  = `insert into topico(titulo, texto, datacriacao, finalizado, id_usuario) values('${titulo}', '${texto}', '${criacao}', 'false','${id_usuario}')`
      await client.query(insert)
      client.end()
  }catch(e){
       console.log(e)
  } 
}

async function insertCompetencia(tecnologia, nivel){
  try{
    client.connect()
    const insert = `insert into competencia(tecnologia,nivel) values('${tecnologia}', '${nivel}')`
    await client.query(insert)
    client.end()
  }catch(e){
    console.log(e)
  }
}

async function insertTag(tecnologia){
  try{
    client.connect()
    const insert = `insert into tag(tecnologia) values('${tecnologia}')`
    await client.query(insert)
    client.end()
  }catch(e){
    console.log(e)
  }
}

async function insertTagTopico(id_topico, tag_id){
  try{
    client.connect()
    const insert = `insert into tag_topico(id_tag,id_topico) values('${tag_id}', '${id_topico}')`
    await client.query(insert)
    client.end()
  }catch(e){
    console.log(e)
  }
}

async function insertUsuarioCompetencia(id_user, id_competencia){
  try{
    client.connect()
    const insert = `insert into usuario_competencia(id_usuario,id_competencia) values('${id_user}', '${id_competencia}')`
    await client.query(insert)
    client.end()
  }catch(e){  
    console.log(e)
  }
}

async function insertComentario(texto, datacriacao, resposta, id_usuario, id_topico){
  try{
    client.connect()
    const insert = `insert into comentario(texto,datacriacao,resposta,id_usuario,id_topico) values('${texto}', '${datacriacao}','${resposta}', '${id_usuario}', '${id_topico}' )`
    await client.query(insert)
    client.end()
  }catch(e){
    console.log(e)
  }
}
async function selectValidacao(email,senha){
  try{
    client.connect()
    const select = `select * from usuario where email = '${email}' and senha = '${senha}'`
    client.query(select).then(res => {
      if(res.rowCount)
        console.log(res)
    }).finally(()=> {
        client.end()
    })
  }catch(e){
    console.log(e)
    client.end()
  }

}

async function selectTag(tag){
    try{
      client.connect()
      const select1 = `select id from tag where tecnologia = '${tag}'`
      var tag_id = await client.query(select1)
      tag_id = tag_id.rows[0].id
      const select2 = `select id_topico from tag_topico where id_tag = '${tag_id}'`
      var tag_topico = await client.query(select2)
      tag_topico = tag_topico.rows
      tag_topico.forEach(tag => {
          const select3 = `select * from topico where id = '${tag.id_topico}'`
          client.query(select3).then(res =>{
            console.log(res)
          }).finally(() => {
            client.end()
          })
      });
    }catch(e){
      console.log(e)
      client.end()
    }
   // const select2 = `select * from tag_topico where email = '${email}' and senha = '${senha}'`
}

//insertUser('peter@peter3.com', '123456', 'Parker', '1998-11-25', 'seila')
//nsertTopico('Duvida JavaScript', 'como usar o angular', '2019-12-17', 'Peter')
//insertCompetencia('HTML5', 'expert')
//insertTag('HTML5')
//insertTagTopico(1,1)
//insertUsuarioCompetencia(1,1)
//insertComentario('n entendo nada de HTML5', '2019-12-17', 'false', '2','1')
//selectValidacao('peter@peter.com', '123456')

//selectTag('HTML5')


module.exports={insertUsuario, insertTopico, insertCompetencia, insertTagTopico, insertTag, insertComentario, selectValidacao, selectTag}





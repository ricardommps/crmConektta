angular.module('constants', [])

    .constant('API_CRM',{
      //url: 'http://localhost:8000/api/'
      // url: 'http://ec2-54-165-1-163.compute-1.amazonaws.com:8000/api/'
        url: 'http://world.conektta.info:8000/api/'
    })

    .constant('SOCKETIO',{
       //url: 'http://localhost:8080'
        // url: 'http://ec2-54-165-1-163.compute-1.amazonaws.com:8000/api/'
        url: 'http://world.conektta.info:8080'
    })

    .constant('API_WORLD_CONEKTTA', {
        url: 'http://world.conektta.info/api/usuarios?listar'
    })

    .constant('API_URL',{

        url:'http://crm.conektta.info'
    })
    .constant('SHIPPINGVALUE',{

        sms:"0.20",
        email:"0.20",
        ads:"0.20"
    });



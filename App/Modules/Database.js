'use strict';
const Realm               = require('realm');
//=============================
//              new
//=============================

const mcf_system_scheam = {
  name: 'mcf_system',
  primaryKey: 'type',
  properties: {
    type:'string',
    value:'string',
  }
}


let realm
export function DatabaseInit() {
  realm = new Realm({
      path: 'mcf_1.0.0.realm',
      schema: [
                mcf_system_scheam
              ],
      schemaVersion: 1,
  })
  console.log(realm.path)
}
export function SaveUserInfo({uid,token}) {
  realm.write(() => {
    realm.create('mcf_system',{type: 'uid', value: uid}, true);
    realm.create('mcf_system',{type: 'token', value: token}, true);
  })
}
export function InitUserInfo() {
  realm.write(() => {
    realm.create('mcf_system',{type: 'uid', value: ''}, true);
    realm.create('mcf_system',{type: 'token', value: ''}, true);
  })
}
export function GetUserInfo() {
  const token = realm.objectForPrimaryKey('mcf_system','token').value;
  const version = realm.objectForPrimaryKey('mcf_system','version').value;
  return {uid,token,version}
}
export function LogOut() {
  realm.write(() => {
    realm.create('mcf_system',{type: 'uid', value: ''}, true);
    realm.create('mcf_system',{type: 'token', value: ''}, true);
  })
}

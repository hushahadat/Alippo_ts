export type ApiData = {
    name : String | null,
    age? : number | String ,
    city : String,
    pinCode : number | null | String
    id? : number| String
}

export type modelData = {
    action? :string,
    data? : ApiData
  }
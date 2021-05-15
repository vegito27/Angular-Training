export class User{
    [x: string]: string | number | Date| Boolean;
    constructor(
        public firstName:string,
        public lastName:string,
        public userName:string,
        public email:string,
        public phone:number,
        public password:string,
        public confirmPassword:string,
        public isAdmin?:boolean
    ){}
}
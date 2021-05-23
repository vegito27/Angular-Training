
const isEmpty=(value)=>
value===undefined || 
value=== null || 
(typeof value==='object' && Object.keys(value).length===0) || 
(typeof value==='string' && value.trim().length===0)

function isValid(p) {
    var phoneRe = /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/;
    var digits = p.replace(/\D/g, "");
    return phoneRe.test(digits);
}
module.exports={isValid,isEmpty}

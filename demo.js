// //.......factorial...........
// function factorial(number) {
//     let sum = 1;
//     for(let value = 1; value <= number; value++){
//         sum = sum * value;
//     }
//     return sum ;
// }
// let number = 6;
// console.log(factorial(number));

//.................................armstrong..........................
//function isArmstrong(number){
    var number  = 153;
    var check = number;
    var armstrong = 0;
    var sum = 0;
    var power;
    var len = number.tostring().length;
    while(number != 0){
        armstrong = number%10;
        power = math.pow(armstrong,len);
        sum = sum +power;
        number = parseInt(number/10);
    };
    if(check == sum){
        console.log("this is armstronng")
    }else{
        console.log("this is not armstronng")
    }
    
console.log(number)
//console.log(isArmstrong(number))
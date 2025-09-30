export function fromatMoney(amountCents){
    return `$${( amountCents / 100).toFixed(2)}`
}
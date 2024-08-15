export async function MakeOrder(cart) {
    const response = await fetch("https://supersimplebackend.dev/orders", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        }
        ,
        body: JSON.stringify({
            'cart': cart
        })
    });
    return await response.json();
}
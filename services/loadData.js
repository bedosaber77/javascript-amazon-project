export async function LoadData(){
    const resp = await fetch("../backend/products.json");
    const data = await resp.json();
    return data;
}
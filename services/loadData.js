export async function LoadData(){
    const resp = await fetch("https://supersimplebackend.dev/products");
    const data = await resp.json();
    return data;
}
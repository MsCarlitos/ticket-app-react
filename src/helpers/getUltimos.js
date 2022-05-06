export const getUltimos = async() => {
    const response = await fetch('http://localhost:8080/ultimos');
    const data = await response.json();
    return data.ultimos;
}
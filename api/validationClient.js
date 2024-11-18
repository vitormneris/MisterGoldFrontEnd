export async function validationClient(token) {
    try {
        const response = await fetch('http://3.138.179.81:8081/autorizacao/token/cliente', {
            method: "GET",
            headers: { 
                "Authorization": "Bearer " + token
            }
        });

        if (response.status === 200) {
            const data = await response.json();
            return data.id;
        } else {
            window.location.href = "/html/login.html";
        }
    } catch (error) {
        window.location.href = "/html/login.html";
    }
}

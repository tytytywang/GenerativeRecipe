// async function startChat() {
//     // Get the user input
//     const userInput = document.getElementById('textInput').value;

//     // Call the ChatGPT API (replace 'YOUR_API_ENDPOINT' with the actual endpoint)
//     const apiEndpoint = 'YOUR_API_ENDPOINT';
//     const response = await fetch(apiEndpoint, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ message: userInput }),
//     });

//     if (response.ok) {
//         // Parse and display the API response on a new page (replace 'result.html' with your result page)
//         const result = await response.json();
//         localStorage.setItem('chatGPTResult', result.message);
//         window.location.href = 'result.html';
//     } else {
//         console.error('Failed to fetch API');
//     }
// }

async function startChat() {
    // Get the user input
    const userInput = document.getElementById('textInput').value;

    // Redirect to a new page
    window.location.href = 'explosive_graph.html';

    // Optionally, you can also send the user input to the new page via localStorage
    localStorage.setItem('userInput', userInput);
}

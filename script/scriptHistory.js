function handleFileUpload(input) {
            const fileNameSpan = input.parentElement.nextElementSibling;
            if (input.files && input.files[0]) {
                const fileName = input.files[0].name;
                fileNameSpan.textContent = fileName.length > 15 ? fileName.substring(0, 15) + '...' : fileName;
                fileNameSpan.style.display = 'inline';
                
                // Change button style to indicate file uploaded
                input.parentElement.style.background = 'linear-gradient(135deg, #059669, #047857)';
                input.parentElement.innerHTML = `
                    <svg class="upload-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                    </svg>
                    Berhasil
                    ${input.outerHTML}
                `;
            }
        }

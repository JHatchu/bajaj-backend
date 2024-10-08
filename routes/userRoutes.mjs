import express from 'express';
import atob from 'atob'; // To decode Base64 string
import mime from 'mime'; // Import mime package

const router = express.Router();

// Utility function to convert Base64 string to buffer
function base64ToBuffer(base64String) {
    const binaryString = atob(base64String);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
}

// Route for GET /bfhl
router.get('/bfhl', (req, res) => {
    try {
        res.status(200).json({ operation_code: 1 });
    } catch (e) {
        res.status(500).json({
            message: "Internal Server Error!"
        });
    }
});

// Route for POST /bfhl
router.post('/bfhl', async (req, res) => {
    const { data, file_b64 } = req.body;
    const user_id = "Harshada_24082003";
    const email = "jh1712@srmist.edu.in";
    const roll_number = "RA2111008020144";

    if (!data || !Array.isArray(data)) {
        return res.status(400).json({ is_success: false });
    }

    const numbers = data.filter(item => !isNaN(item));
    const alphabets = data.filter(item => /^[a-zA-Z]$/.test(item));
    const highest_lowercase_alphabet = alphabets.filter(item => /^[a-z]$/.test(item)).sort().pop() || [];

    // File handling (Base64 validation)
    let file_valid ;
    let file_mime_type;
    let file_size_kb ;

    if (file_b64) {
        // Strip off the metadata if present
        const base64Data = file_b64.replace(/^data:(.*?);base64,/, "");
        const fileExtension = file_b64.match(/data:(.*?);base64,/)[1].split('/')[1]; // Extract file extension

        try {
            const buffer = base64ToBuffer(base64Data);
            file_mime_type = mime.getType(fileExtension); // Get MIME type from extension
            file_size_kb = (buffer.byteLength / 1024).toFixed(2); // Convert size to KB
            file_valid = true; // Set valid to true since we are able to process the file
        } catch (error) {
            console.log("Error processing file:", error);
        }
    }

    res.json({
        is_success: true,
        user_id,
        email,
        roll_number,
        numbers,
        alphabets,
        highest_lowercase_alphabet,
        file_valid,
        file_mime_type,
        file_size_kb
    });
});

export default router;

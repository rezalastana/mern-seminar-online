const mongoose = require("mongoose");
const { faker } = require("@faker-js/faker");

// Import model Category
const Category = require("./categories/model");

// URI MongoDB
const uri = "mongodb://localhost:27017/db_semina_bootcamp";

async function seedDB() {
    try {
        // Koneksi ke MongoDB
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log("Connected to MongoDB");

        // Menghasilkan data palsu
        const categories = [];
        for (let i = 0; i < 1000; i++) {
            const category = {
                name: faker.commerce.department(), // Menggunakan department sebagai nama kategori
            };
            categories.push(category);
        }

        // Simpan data ke MongoDB
        await Category.insertMany(categories);
        console.log("500 data kategori palsu telah berhasil disimpan!");
    } catch (error) {
        console.error("Terjadi kesalahan saat menyimpan data:", error);
    } finally {
        // Tutup koneksi
        mongoose.connection.close();
    }
}

// Jalankan fungsi seedDB
seedDB();

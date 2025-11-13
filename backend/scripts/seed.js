const mongoose = require('mongoose');
const Contact = require('../models/contact'); 
require('dotenv').config();

// Data test, direct script
const contactsData = [
  {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    favoriteColor: "Blue",
    birthday: new Date("1990-05-15"),
    phone: "+1234567890",
    company: "Tech Solutions Inc.",
    jobTitle: "Software Developer",
    notes: "Met at the tech conference last year",
    isFavorite: true,
    category: "work",
    ipaddresse: "198.03.30.5"
  },
  {
    firstName: "Jane",
    lastName: "Smith", 
    email: "jane.smith@example.com",
    favoriteColor: "Green",
    birthday: new Date("1985-08-22"),
    phone: "+1234567891",
    company: "Design Studio",
    jobTitle: "UI/UX Designer",
    notes: "Great collaborator on projects",
    isFavorite: false,
    category: "work",
    ipaddresse: "198.03.30.3"
  },
  {
    firstName: "Bob",
    lastName: "Johnson",
    email: "bob.johnson@example.com",
    favoriteColor: "Red",
    birthday: new Date("1992-12-10"),
    phone: "+1234567892",
    company: "Family Business",
    jobTitle: "Manager",
    notes: "College friend",
    isFavorite: true,
    category: "friend",
     ipaddresse: "198.03.30.6"
  },
  {
    firstName: "Alice",
    lastName: "Brown",
    email: "alice.brown@example.com",
    favoriteColor: "Purple",
    birthday: new Date("1988-03-30"),
    phone: "+1234567893",
    company: "",
    jobTitle: "",
    notes: "Cousin",
    isFavorite: true,
    category: "family",
    ipaddresse: "198.03.30.0"
  }
];

const seedDatabase = async () => {
  try {
    // Connexion à MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log(' Connected to MongoDB');

    // Nettoyer la collection existante
    await Contact.deleteMany({});
    console.log(' Existing contacts cleared');

    // Insérer les nouveaux contacts
    const contacts = await Contact.insertMany(contactsData);
    console.log(` ${contacts.length} contacts inserted successfully`);

    // Afficher les contacts insérés
    console.log('\n Inserted contacts:');
    contacts.forEach(contact => {
      console.log(`   - ${contact.firstName} ${contact.lastName} (${contact.email})`);
    });

    console.log('\n Database seeding completed!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error);
    process.exit(1);
  }
};

seedDatabase();
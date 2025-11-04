const mongoose = require('mongoose');
const Contact = require('./models/Contact');
const contactsData = require('./data/seedContacts.json');
require('dotenv').config();

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
    console.log('\n📋 Inserted contacts:');
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
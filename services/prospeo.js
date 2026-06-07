const axios = require("axios");

async function findDecisionMakers(domain) {

    try {

        console.log(
            `\n[2/4] Finding contacts for ${domain}`
        );

        const response = await axios.post(

            "https://api.prospeo.io/search-person",

            {
                page: 1,

                filters: {

                    company: {
                        websites: {
                            include: [domain],
                        },
                    },

                    person_seniority: {
                        include: ["Founder/Owner",],
                    },
                },
            },

            {
                headers: {

                    "X-KEY":process.env.PROSPEO_API_KEY,

                    "Content-Type":"application/json",
                },
            }
        );

        const results =
            response.data.results || [];

        const contacts = results.map((item) => {

            return {
                name: item.person?.full_name,
                title: item.person?.current_job_title,
                linkedin: item.person?.linkedin_url,
                personId: item.person?.person_id,
                email: item.person?.email?.email,
                emailStatus: item.person?.email?.status,
            };
        });

        console.log("\nContacts Found:\n");

        contacts.forEach((contact, index) => {
            console.log(`${index + 1}. ${contact.name}`);
            console.log(`   ${contact.title}`);
            console.log(`   ${contact.linkedin}`);
            console.log(`   Email: ${contact.email}`);
            console.log(`   Email Status: ${contact.emailStatus}`);
        });

        return contacts;

    } catch (err) {

        console.log(
            "Prospeo Error was found:",
            err.response?.data || err.message
        );

        return [];
    }
}

module.exports = {
    findDecisionMakers,
};
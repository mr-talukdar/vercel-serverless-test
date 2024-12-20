// api/getData.js
import { createRequest, Client } from '@urql/core';

// Replace with your Hygraph (or any other GraphQL API) URL
const GRAPHQL_API_URL = 'https://ap-south-1.cdn.hygraph.com/content/clibrx2930jac01uqc3a9f2hi/master';
const API_TOKEN = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE3MzQ2ODE3MTcsImF1ZCI6WyJodHRwczovL2FwaS1hcC1zb3V0aC0xLmh5Z3JhcGguY29tL3YyL2NsaWJyeDI5MzBqYWMwMXVxYzNhOWYyaGkvbWFzdGVyIiwibWFuYWdlbWVudC1uZXh0LmdyYXBoY21zLmNvbSJdLCJpc3MiOiJodHRwczovL21hbmFnZW1lbnQtYXAtc291dGgtMS5oeWdyYXBoLmNvbS8iLCJzdWIiOiI5ZGQ5OTUyYi02NWQyLTRhMDItOTQyNy1jNTZiZjY0Y2ZiZGMiLCJqdGkiOiJjbTR3Z3BmYTAwZ3RkMDdvNDFxb2Vkc3oyIn0.NChKdlkc4vZHpdjnGAoHsLCgNApJPfQovmIeVxHAF64ojghDrz5j9L3y-oBelIWnYFziXXjOp2TQiX6xu2-mIeiXPui_9_VP_H5JAOO8FqSHt6QfpgWgUkhK3WTSwhZhCM6b063gZOts7tnkXexoF7YlWQRxKWyIc1Kv8YX-bvXWNt64ZG0DpUp8FWCVAMxkT5Fy-E6lTmt0q8gwL09VlNFWCZyMnwlpP9jNE53ntIwcYztUI1fcmQwdRWeFowLI6ubbmmgwKAXglL2lRffpeTBTQNINWKqBy67Pk2U2rthmrNdrorZls31gHAszxXKIYFq_WECADaNOTseACL90Eq5o3tkuBvwS0qarEtLcRGgHNE9zbJx31NhZriOW5BAakzyq1sTRhdKadIqmWSf4iOmcaboWosWgAiX2OVTtNkttPAC9zDuKR2gqTCfj69h2mYP444SzqmiHT6eNVgyiRbVdEHQG_w2ZoxVBfuF_SYxgueKbH6LVCc4h0fNVdh7kdgijzUTyUTBd75h_62AXTSiAGqUDN03uBvGnluK-CwHLhqhrMTeGoCJSjc7V7tulz987Xwr-7e18uosa0zglZrY_ZrkNg9Om8iwnxhSpxXi2Cx8kAJmMQKXrS8lOsHjjBd2rJUw0I8n84JPwwwczxJnwNyfELYcDSZ7EX4Tt7OE'; // Replace with your actual API token

// Initialize Urql Client
const client = new Client({
    url: GRAPHQL_API_URL,
    fetchOptions: {
        headers: {
            Authorization: `Bearer ${API_TOKEN}`,
        },
    },
});

const GET_DATA_QUERY = `
  query {
    projects {
    id
    image {
      url
    }
    name
    publishedAt
    publishedBy {
      name
    }
    slug
    tags
    tagsColor
    updatedAt
  }
  }
`;

export default async function handler(req, res) {
    try {
        // Execute the query using Urql client
        const { data, error } = await client.query(GET_DATA_QUERY).toPromise();

        if (error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(200).json(data);
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

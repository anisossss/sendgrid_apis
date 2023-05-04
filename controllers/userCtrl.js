const axios = require("axios");
require("dotenv").config();
const client = require("@sendgrid/client");

client.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = {
  addSubAccount: async (req, res, next) => {
    try {
      const { username, email, password } = req.body;

      const data = {
        username: username,
        email: email,
        password: password,
        // ips: ["0.0.0.0/0"],
      };

      const request = {
        url: `/v3/subusers`,
        method: "POST",
        body: data,
      };

      client
        .request(request)
        .then(([response, body]) => {
          console.log(response.statusCode);
          console.log(response.body);

          res.status(200).json({
            success: true,
            message: "Added subuser",
            data: response.body,
          });
        })
        .catch((error) => {
          console.error(error.response.body.errors[0].message);
          res.status(501).json({
            success: false,
            message: error.response.body.errors[0].message,
          });
        });
    } catch (error) {
      res.status(500).json({ error: res.body });
    }
  },
  getSubAccounts: async (req, res, next) => {
    try {
      const request = {
        url: `/v3/subusers`,
        method: "GET",
      };

      client
        .request(request)
        .then(([response, body]) => {
          console.log(response.statusCode);
          console.log(response.body);
          res.status(200).json({
            success: true,
            message: "Sub Users Retrieved",
            data: response.body,
          });
        })
        .catch((error) => {
          console.error(error);
          res.status(501).json({
            success: false,
            message: error.response.body.errors[0].message,
          });
        });
    } catch (error) {
      res.status(500).json({ error: res.body });
    }
  },

  deleteSubAccount: async (req, res, next) => {
    try {
      const subuser_name = req.body.subuser_name;

      const request = {
        url: `/v3/subusers/${subuser_name}`,
        method: "DELETE",
      };

      client
        .request(request)
        .then(([response, body]) => {
          res.status(200).json({
            success: true,
            message: "Deleted subuser",
          });
        })
        .catch((error) => {
          res.status(501).json({
            success: false,
            message: error.response.body.errors[0].message,
          });
        });
    } catch (error) {
      res.status(500).json({ error: res.text });
    }
  },

  createSenderIdentity: async (req, res, next) => {
    try {
      const {
        nickname,
        from_email,
        from_name,
        reply_to_email,
        reply_to_name,
        address,
        address_2,
        city,
        state,
        zip,
        country,
      } = req.body;

      const data = {
        nickname: nickname,
        from: {
          email: from_email,
          name: from_name,
        },
        reply_to: {
          email: reply_to_email,
          name: reply_to_name,
        },
        address: address,
        address_2: address_2,
        city: city,
        state: state,
        zip: zip,
        country: country,
      };

      const request = {
        url: `/v3/marketing/senders`,
        method: "POST",
        body: data,
      };

      client
        .request(request)
        .then(([response, body]) => {
          console.log(response.statusCode);
          console.log(response.body);
          res.status(200).json({
            success: true,
            message: "Sender Identity created",
            data: response.body,
          });
        })
        .catch((error) => {
          console.error(error);
          res.status(501).json({
            success: false,
            message: error.response.body.errors[0].message,
          });
        });
    } catch (error) {
      res.status(500).json({ error: res.text });
    }
  },

  createList: async (req, res, next) => {
    try {
      const { name } = req.body;
      const data = {
        name: name,
      };

      const request = {
        url: `/v3/marketing/lists`,
        method: "POST",
        body: data,
      };

      client
        .request(request)
        .then(([response, body]) => {
          console.log(response.statusCode);
          console.log(response.body);
          res.status(200).json({
            success: true,
            message: "List Created",
            data: response.body,
          });
        })
        .catch((error) => {
          console.error(error);
          res.status(501).json({
            success: false,
            message: error.response.body.errors[0].message,
          });
        });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },
  getLists: async (req, res, next) => {
    try {
      const request = {
        url: `/v3/marketing/lists`,
        method: "GET",
      };
      client
        .request(request)
        .then(([response, body]) => {
          console.log(response.statusCode);
          console.log(response.body);
          res.status(200).json({
            success: true,
            message: "Lists retrieved",
            data: response.body,
          });
        })
        .catch((error) => {
          console.error(error);
          res.status(501).json({
            success: false,
            message: error.response.body.errors[0].message,
          });
        });
    } catch (error) {
      res.status(500).json({ error: res.text });
    }
  },
  createRecipient: async (req, res, next) => {
    try {
      const { email } = req.body;

      const data = {
        contacts: [
          {
            email: email,
          },
        ],
      };

      const request = {
        url: `/v3/marketing/contacts`,
        method: "PUT",
        body: data,
      };

      client
        .request(request)
        .then(([response, body]) => {
          console.log(response.statusCode);
          console.log(response.body);
          res.status(200).json({
            success: true,
            message: "Recipient Created",
            data: response.body,
          });
        })
        .catch((error) => {
          console.error(error);
          res.status(501).json({
            success: false,
            message: error.response.body.errors[0].message,
          });
        });
    } catch (error) {
      res.status(500).json({ error: res.text });
    }
  },

  createCampaign: async (req, res, next) => {
    try {
      const {
        name,
        categories,
        send_at,
        list_ids,
        updated_at,
        created_at,
        subject,
        html_content,
        plain_content,
        generate_plain_content,
        editor,
        suppression_group_id,
        custom_unsubscribe_url,
        sender_id,
        ip_pool,
      } = req.body;

      const data = {
        name: name,
        categories: categories,
        send_at: send_at,
        send_to: {
          list_ids: [list_ids],
        },
        updated_at: updated_at,
        created_at: created_at,
        email_config: {
          subject: subject,
          html_content: html_content,
          plain_content: plain_content,
          generate_plain_content: generate_plain_content,
          editor: editor,
          suppression_group_id: suppression_group_id,
          custom_unsubscribe_url: custom_unsubscribe_url,
          sender_id: sender_id,
          ip_pool: ip_pool,
        },
      };

      const request = {
        url: `/v3/marketing/singlesends`,
        method: "POST",
        body: data,
      };

      client
        .request(request)
        .then(([response, body]) => {
          console.log(response.statusCode);
          console.log(response.body);
          res.status(200).json({
            success: true,
            message: "Campaign Created",
            data: response.body,
          });
        })
        .catch((error) => {
          console.error(error);
          res.status(501).json({
            success: false,
            message: error.response.body.errors[0].message,
          });
        });
    } catch (error) {
      res.status(500).json({ error: res.text });
    }
  },

  getCampaigns: async (req, res, next) => {
    try {
      const request = {
        url: `/v3/marketing/singlesends`,
        method: "GET",
      };
      client
        .request(request)
        .then(([response, body]) => {
          console.log(response.statusCode);
          console.log(response.body);
          res.status(200).json({
            success: true,
            message: "Campaigns Retrieved",
            data: response.body,
          });
        })
        .catch((error) => {
          console.error(error);
          res.status(501).json({
            success: false,
            message: error.response.body.errors[0].message,
          });
        });
    } catch (error) {
      res.status(500).json({ error: res.text });
    }
  },

  scheduleCampaign: async (req, res, next) => {
    try {
      const { id, send_at } = req.body;

      const data = {
        send_at: send_at,
      };

      const request = {
        url: `/v3/marketing/singlesends/${id}/schedule`,
        method: "PUT",
        body: data,
      };

      client
        .request(request)
        .then(([response, body]) => {
          console.log(response.statusCode);
          console.log(response.body);
          res.status(200).json({
            success: true,
            message: "Campaign Sent",
            data: response.body,
          });
        })
        .catch((error) => {
          console.error(error);
          res.status(501).json({
            success: false,
            message: error.response.body.errors,
          });
        });
    } catch (error) {
      res.status(500).json({ error: res.text });
    }
  },


  getStats: async (req, res, next) => {
    try {
      const { id } = req.body;

      const queryParams = {
 
        "page_size": 50
      };
      
      const request = {
        url: `/v3/marketing/stats/singlesends`,
        method: 'GET',
        qs: queryParams
      }
      
      client.request(request)
        .then(([response, body]) => {
          console.log(response.statusCode);
          console.log(response.body);
          res.status(200).json({
            success: true,
            message: "Campaigns Stats by ID",
            data: response.body,
          });
        })
        .catch(error => {
          console.error(error);
          res.status(501).json({
            success: false,
            message: error.response.body.errors,
          });
        });
      
    } catch (error) {
      res.status(500).json({ error: res.text });
    }
  },
};

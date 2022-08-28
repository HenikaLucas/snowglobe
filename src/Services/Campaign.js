import axios from "axios";

function campaignServices() {
    const _BASE_URL = "/api";

    const participation = ({retailer, data}) => {
        return axios({
            method: "POST",
            url: `${_BASE_URL}/${retailer === "muller" ? "mueller" : retailer}/Participate`,
            data: data,
            headers: { 'Content-Type': 'multipart/form-data' }
        })
    }

    const status = ({retailer}) => {
        return axios({
            method: "GET",
            url: `${_BASE_URL}/${retailer === "muller" ? "mueller" : retailer}/Status`,
        })
    }

    const newsletterSubscribe = ({retailer, data}) => {
        return axios({
            method: "POST",
            url: `${_BASE_URL}/${retailer === "muller" ? "mueller" : retailer}/newsletterSubscribe`,
            data: data
        });
    }

    const supportingProfile = (_data) => {
        return axios({
            method: 'post',
            url: `https://milka-supporting.azurewebsites.net/supporting/crm/profile`,
            data: _data
        })
    }

    return {
        Status: status,
        Participate: participation,
        NewsletterSubscribe : newsletterSubscribe,
        SupportingProfile : supportingProfile
    }
}

const CampaignServices = campaignServices();

export default CampaignServices;
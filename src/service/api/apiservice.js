import React from 'react';


const BASE_URL = 'http://192.168.1.117/mobileapp2.0/public/application'
const ESS_BASE_URL = 'http://192.168.1.119/mobileapp2.0/public/application'

// LoginScreen

export const LoginRequest = async (bodydata) => {
    try {
        const response = await fetch(`${BASE_URL}/commonio/checkuserdetailsweb`,
            {
                method: 'POST',
                body: JSON.stringify(bodydata),
            },
        )
        console.log(response)
        return response;
    } catch (e) {
        console.log(e)
    }

}

// RegisterSceen

export const RegisterRequest = async (bodydata) => {
    try {
        const response = await fetch(
            `${BASE_URL}/commonio/getappinfo`,
            {
                method: 'POST',
                body: JSON.stringify(bodydata),
            },
        )
        console.log(response)
        return response;
    } catch (e) {
        console.log(e)
    }
}

//DashboardScreen 

export const getCompanyRequest = async (bodydata) => {
    try {
        const response = await fetch(
            'http://192.168.1.117/mobileapp2.0/public/application//management/getcompany',
            {
                method: 'POST',
                body: JSON.stringify(bodydata),
            },
        )
        console.log(response)
        return response;
    } catch (e) {
        console.log(e)
    }
}

//AccountPayble
export const PayableRequest = async (bodydata) => {
    try {
        const response = await fetch(
            `${BASE_URL}/management/getpayable`,
            {
                method: 'POST',
                body: JSON.stringify(bodydata),
            },
        )
        console.log(response, 'payable');
        return response;
    } catch (e) {
        console.log(e)
    }
}
export const PayableDetailsRequest = async (bodydata) => {
    try {
        const response = await fetch(
            `${BASE_URL}/management/getpayabledetails`,
            {
                method: 'POST',
                body: JSON.stringify(bodydata),
            },
        )
        console.log(response);
        return response;
    } catch (e) {
        console.log(e)
    }
}

// AccountRecievable
export const ReceivableRequest = async (bodydata) => {
    try {
        const response = await fetch(
            `${BASE_URL}/management/getreceivable`,
            {
                method: 'POST',
                body: JSON.stringify(bodydata),
            },
        )
        console.log(response);
        return response;
    } catch (e) {
        console.log(e)
    }
}

export const ReceivableDetailsRequest = async (bodydata) => {
    try {
        const response = await fetch(
            `${BASE_URL}/management/getreceivabledetails`,
            {
                method: 'POST',
                body: JSON.stringify(bodydata),
            },
        )
        console.log(response);
        return response;
    } catch (e) {
        console.log(e)
    }
}

// BankDetails

export const BankDetailsRequest = async (bodydata) => {
    try {
        const response = await fetch(
            `${BASE_URL}/management/getcashbankbalance`,
            {
                method: 'POST',
                body: JSON.stringify(bodydata),
            },
        )
        console.log(response);
        return response;
    } catch (e) {
        console.log(e)
    }
}
// PendingListScreen

export const ApproveListRequest = async (bodydata) => {
    try {
        const response = await fetch(
            `${BASE_URL}/management/approvalList`,
            {
                method: 'POST',
                body: JSON.stringify(bodydata),
            },
        )
        console.log(response);
        return response;
    } catch (e) {
        console.log(e)
    }
}

export const ApproveWorkRequest = async (bodydata) => {
    try {
        const response = await fetch(
            `${BASE_URL}/management/approveWork`,
            {
                method: 'POST',
                body: JSON.stringify(bodydata),
            },
        )
        console.log(response);
        return response;
    } catch (e) {
        console.log(e)
    }
}

export const approvalDetailsViewRequest = async (bodydata) => {
    try {
        const response = await fetch(
            `${BASE_URL}/management/approvalDetailsView`,
            {
                method: 'POST',
                body: JSON.stringify(bodydata),
            },
        )
        console.log(response);
        return response;
    } catch (e) {
        console.log(e)
    }
}
export const getESSDashBoardList = async (bodydata) => {
    try {
        const response = await fetch(
            `${ESS_BASE_URL}/ess/getdashboardlist`,
            {
                method: 'POST',
                body: JSON.stringify(bodydata),
            },
        )
        console.log(response);
        return response;
    } catch (e) {
        console.log(e)
    }
}

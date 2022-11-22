

const CommunicationController = async (endpoint, parameters) => {
    const BASE_URL = 'https://develop.ewlab.di.unimi.it/mc/twittok/';
    console.log("sending request to: " + endpoint);

    const url = BASE_URL + endpoint;

    const httpResponse = await fetch(url, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(parameters)
    });

    const status = httpResponse.status;
    if (status == 200) {
        const deserializedObject = await httpResponse.json();
        return deserializedObject;
    } else {
        const error = new Error("Error message from the server. HTTP status: " + status);
        throw error;
    }
}

const RequestHandler = async (endpoint, params) => {
    const BASE_URL = "https://develop.ewlab.di.unimi.it/mc/twittok/";

    console.log("FACCIO UNA RICHIESTA ALL'ENDPOINT: ", endpoint);
    const REQUEST_URL = BASE_URL + endpoint;

    const httpRequest = await fetch(REQUEST_URL, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
    });
    if (httpRequest.status == 200) {
        const result = await httpRequest.json();
        return result;
    } else {
        const error = new Error(
            "ERROR MESSAGE FROM THE SERVER. HTTP STATUS: " + httpRequest.status
        );
        throw error;
    }
};

const register = async () => {
    const endPoint = "register";
    const parameter = {};
    return await CommunicationController(endPoint, parameter);
}

const getProfile = async (sid) => {
    return await RequestHandler("getProfile", { sid: sid });
};

const setProfile = async (sid, name, picture) => {
    return await RequestHandler("setProfile", {
        sid: sid,
        name: name,
        picture: picture,
    });
};

const getTwok = async (sid, tid, uid) => {
    return await RequestHandler("getTwok", { sid: sid, uid: uid, tid: tid });
};

const addTwok = async (
    sid,
    text,
    bgcol,
    fontcol,
    fontsize,
    fonttype,
    halign,
    valign,
    lat,
    lon
) => {
    return await RequestHandler("addTwok", {
        sid: sid,
        text: text,
        bgcol: bgcol,
        fontcol: fontcol,
        fontsize: fontsize,
        fonttype: fonttype,
        halign: halign,
        valign: valign,
        lat: lat,
        lon: lon,
    });
};

const getPicture = async (sid, uid) => {
    return await RequestHandler("getPicture", { sid: sid, uid: uid });
};

const follow = async (sid, uid) => {
    return await RequestHandler("follow", { sid: sid, uid: uid });
};

const unfollow = async (sid, uid) => {
    return await RequestHandler("unfollow", { sid: sid, uid: uid });
};

const getFollowed = async (sid) => {
    return await RequestHandler("getFollowed", { sid: sid });
};

const isFollowed = async (sid, uid) => {
    return await RequestHandler("isFollowed", { sid: sid, uid: uid});
};

export {
    register,
    getProfile,
    getTwok,
    getPicture,
    addTwok,
    follow,
    unfollow,
    getFollowed,
    setProfile,
    isFollowed,
};

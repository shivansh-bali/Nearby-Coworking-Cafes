export const fetch2 = async (api: any, body: any) => {
  if (body) {
    let entries: any = Object.keys(body);
    let data = new FormData();
    for (let i of entries) {
      data.append(i, body[i]);
    }
    const res = await fetch(api, {
      method: "post",
      credentials: "include",
      body: data,
    });
    return await res.json();
  } else {
    const res = await fetch(api, {
      method: "post",
      credentials: "include",
    });
    return await res.json();
  }
};

export const fetch3 = async (api: any, type: any) => {
  const res = await fetch(api, {
    method: type,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    mode: "cors",
    credentials: "include",
  });
  return await res.json();
};

export const fetch4 = async (api: any, body: any) => {
  if (body) {
    const res = await fetch(api, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      mode: "cors",
      body: JSON.stringify(body),
      credentials: "include",
    });
    return await res.json();
  } else {
    const res = await fetch(api, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      mode: "cors",
      credentials: "include",
    });
    return await res.json();
  }
};

export const fetch5 = async (api: any, body: any) => {
  if (body) {
    const res = await fetch(api, {
      method: "put",
      headers: {
        "content-type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
      body: JSON.stringify(body),
    });
    return await res.json();
  } else {
    const res = await fetch(api, {
      method: "put",
      headers: {
        "content-type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
    });
    return await res.json();
  }
};

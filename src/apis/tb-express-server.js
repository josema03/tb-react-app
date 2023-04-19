const baseUrl = `http://localhost:8080`;

export const getData = async (fileName) => {
    try {
        const response = await fetch(`${baseUrl}/files/data${!!fileName ? `?fileName=${encodeURIComponent(fileName)}` : ''}`).then(
            (resp) => {
                if (resp.ok) {
                    return resp.json();
                }
                throw resp;
            }
        );

        return { ok: true, value: response };
    } catch (error) {
        console.error(error);
        return { ok: false, error };
    }
};

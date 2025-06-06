import { useEffect, useState } from "react";

function useCurInfo(currency) {
    const [exchangeRates, setExchangeRates] = useState({});
    const [allCurrencies, setAllCurrencies] = useState([]);

    // Fetch all available currencies
    useEffect(() => {
        const fetchAllCurrencies = async () => {
            try {
                const response = await fetch("https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json");
                const result = await response.json();
                if (result) {
                    setAllCurrencies(Object.keys(result));
                }
            } catch (error) {
                console.error("Error fetching currency list:", error);
            }
        };

        fetchAllCurrencies();
    }, []);

    // Fetch conversion rates based on selected currency
    useEffect(() => {
        const fetchCurrencyData = async () => {
            try {
                const response = await fetch(
                    `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`
                );
                const result = await response.json();

                if (result && result[currency]) {
                    setExchangeRates(result[currency]); // Store conversion rates
                } else {
                    console.error("Invalid currency data received:", result);
                }
            } catch (error) {
                console.error("Error fetching currency data:", error);
            }
        };

        if (currency) {
            fetchCurrencyData();
        }
    }, [currency]);

    return { exchangeRates, allCurrencies };
}

export default useCurInfo;

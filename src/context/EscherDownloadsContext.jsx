import { createContext, useCallback, useContext, useMemo, useState } from "react"

const defaultContext = {
    escherDownloads: 'many',
    fetchEscherDownloads: () => {},
}

const EscherDownloadsContext = createContext(defaultContext);

export const useEscherDownloads = () => useContext(EscherDownloadsContext);

export function EscherDownloadsProvider({ children }) {
    const [escherDownloads, setEscherDownloads] = useState('many');

    const fetchEscherDownloads = useCallback(() => {
        fetch('https://api.github.com/repos/ZungrySoft/The-Escher-Dimension/releases')
            .then(response => response.json())
            .then(data => {
                let total = 0;
                for (let release of data) {
                    for (let asset of release.assets) {
                        total += asset.download_count;
                    }
                }
                setEscherDownloads(total);
            });
    }, [setEscherDownloads]);

    return (
        <EscherDownloadsContext.Provider
            value={useMemo(
                () => ({
                    escherDownloads,
                    fetchEscherDownloads,
                }),
                [
                    escherDownloads,
                    fetchEscherDownloads,
                ]
            )}
        >
            {children}
        </EscherDownloadsContext.Provider>
    );
}
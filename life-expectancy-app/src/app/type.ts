export type FormData = {
    Height: string;
    Weight: string;
    Alcohol: string;
    Income: string;
    Schooling: string;
    Smoking: string;
    Physical_Activity: string;
};

export type result = {
    xgb:string;
    saint:string;
}

export type PreviewProp = {
    name: string;
    data: FormData;
    onNext: () => void;
    setResults:React.Dispatch<React.SetStateAction<result>>
};

export type UserFormProp = {
    name: string;
    data: FormData;
    setData: React.Dispatch<React.SetStateAction<FormData>>;
    onNext: () => void;
};

export type HomePageProps = {
    name: string;
    setName: React.Dispatch<React.SetStateAction<string>>;
    onNext: () => void;
};


export type ResultsProps = {
    name:string;
    results:result;
};
import { StackScreenProps } from '@react-navigation/stack/lib/typescript/src/types';

export type StackParamList = {
    Chart: undefined;
    ChartDetails: undefined;
}

export type TopTabParamList = {
    BestSeller: undefined;
    Yearly: undefined;
}
export type ChartDetailsProps = StackScreenProps<StackParamList, 'ChartDetails'>

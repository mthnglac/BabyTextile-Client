import { StackScreenProps } from '@react-navigation/stack/lib/typescript/src/types';

export type AppScreenInfo = {
    name: string;
    component: any;
    options: {
        headerShown: boolean;
    };
}

// react-navigation
export type MainStackParamList = {
    Root: undefined;
    ImageModal: { imageURL: string };
    SizeModal: { parentState: any; parentDispatch: any };
}
export type RootProps = StackScreenProps<MainStackParamList, 'Root'>
export type ImageModalProps = StackScreenProps<MainStackParamList, 'ImageModal'>
export type SizeModalProps = StackScreenProps<MainStackParamList, 'SizeModal'>

export type MainBottomTabNavigatorParamList = {
    Products: undefined;
    Orders: undefined;
    Exchanges: undefined;
    Chart: undefined;
    Profile: undefined;
}

// tab-bar-icon
export type TabBarIconType = {
    focused: boolean;
    color: string;
    name: string;
}

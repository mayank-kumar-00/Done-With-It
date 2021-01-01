import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppLoading from 'expo-app-loading';

import AppNavigator from './app/navigation/AppNavigator';
import { AuthContext } from './app/auth/context';
import AuthNavigator from './app/navigation/AuthNavigator';
import OfflineNotice from './app/shared/OfflineNotice';
import authStorage from './app/auth/storage';
import navigationTheme from './app/navigation/navigationTheme';
import colors from './app/config/colors';

export default function App() {
    const [user, setUser] = useState(null);
    const [isReady, setIsReady] = useState(false);

    const restoreUser = async () => {
        const currentUser = await authStorage.getUser();
        if (currentUser) setUser(currentUser);
    };

    if (!isReady)
        return (
            <AppLoading
                startAsync={restoreUser}
                onError={console.warn}
                onFinish={() => setIsReady(true)}
            />
        );

    return (
        <View style={styles.container}>
            <AuthContext.Provider value={{ user, setUser }}>
                <OfflineNotice />
                <NavigationContainer theme={navigationTheme}>
                    {user ? <AppNavigator /> : <AuthNavigator />}
                </NavigationContainer>
            </AuthContext.Provider>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { backgroundColor: colors.white, flex: 1 }
});

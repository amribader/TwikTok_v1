import React from 'react';
import {View, StyleSheet} from 'react-native';

const SingleUserRow = () => {
    return (
        <View>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('BachecaUtente', {
                    uid: item.uid,
                    name: item.name
                })}
            >

                

                <Text>
                    {item.uid}
                    {item.name}
                    {item.pversion}
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({})

export default SingleUserRow;

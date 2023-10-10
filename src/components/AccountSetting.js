import React, {useState} from 'react';
import {View, Image, Switch} from 'react-native';
import {wp} from '../components/Responsiveness';
import Colors from '../theme/Colors';
import ResponsiveText from './ResponsiveText';

const AccountSetting = props => {
  // const [isEnabled, setIsEnabled] = useState(false);
  // const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  
  var data = props.data;

  return (
    <View style={styles.container}>
      <ResponsiveText style={{fontSize: 3.5}}>{props.title}</ResponsiveText>
      <View>
        {props.arrow && (
          <Image
            style={{marginRight: 10}}
            source={require('../assets/images/side_arrow1.png')}
          />
        )}
        {(props.switch && props.privateAccount) ? 
            <Switch
              trackColor={{false: 'lightgrey', true: 'lightgrey'}}
              thumbColor={data.private_account == 1 ? Colors.Primary : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={()=> {
                if(data.private_account == 1) {
                  props.toggleSwitch("private_account","0");
                }else {
                  props.toggleSwitch("private_account","1");
                }
              }}
              value={data.private_account == 1 ? true :false}
            />
          : 
          (props.switch && props.securePayment) ?
            <Switch
              trackColor={{false: 'lightgrey', true: 'lightgrey'}}
              thumbColor={data.secure_payment == 1 ? Colors.Primary : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={()=> {
                if(data.secure_payment == 1) {
                  props.toggleSwitch("secure_payment","0");
                }else {
                  props.toggleSwitch("secure_payment" , "1");
                }
              }}
              value={data.secure_payment == 1 ? true :false}
            />
          :
          (props.switch && props.syncContactNumber) ?
            <Switch
              trackColor={{false: 'lightgrey', true: 'lightgrey'}}
              thumbColor={data.sync_contact_no == 1 ? Colors.Primary : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={()=> {
                if(data.sync_contact_no == 1) {
                  props.toggleSwitch("sync_contact_no" ,"0");
                }else {
                  props.toggleSwitch("sync_contact_no" ,"1");
                }
              }}
              value={data.sync_contact_no == 1 ? true :false}
            />
          :
          (props.switch && props.appNotification) ?
            <Switch
              trackColor={{false: 'lightgrey', true: 'lightgrey'}}
              thumbColor={data.app_notification == 1 ? Colors.Primary : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={()=> {
                if(data.app_notification == 1) {
                  props.toggleSwitch("app_notification" , "0");
                }else {
                  props.toggleSwitch("app_notification" , "1");
                }
              }}
              value={data.app_notification == 1 ? true :false}
            />
          :null
        }
      </View>
    </View>
  );
};
const styles = {
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: wp(3),
  },
};
export default AccountSetting;

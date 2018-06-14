import React, { Component } from 'react';
import { FirestoreCollection, withFirestore } from 'react-firestore';
import { Form } from "semantic-ui-react";
import FirestorePath from 'shared/FirestorePath';

class HealthPlanSelector extends Component {
    render() {
        const { healthPlanId, onChange } = this.props;
        return <FirestorePath path="HealthPlans" render={fullPath => (
            <FirestoreCollection
                path={fullPath}
                render={({ isLoading, data }) => {
                    const healthPlans = data.map(item => ({ key: item.id, value: item.id, text: item.name }));
                    healthPlans.unshift({ key: '', value: '', text: 'Particular' })
                    return <Form.Select
                        loading={isLoading}
                        width={7}
                        label='Convênio'
                        name='healthPlanId'
                        value={healthPlanId}
                        options={healthPlans}
                        placeholder='Particular'
                        onChange={onChange}
                    />
                }}
            />
        )} />;
    }
}
export default withFirestore(HealthPlanSelector);

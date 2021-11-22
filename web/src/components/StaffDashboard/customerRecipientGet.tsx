import {useForm} from 'react-hook-form';


const CustomerRecipientGet = () => {

    const {register, handleSubmit, reset, resetField} = useForm();


    const onSubmitCustomerGet = (dataCustomerGet: any) => {

        // used to handle get request for getting customers recipients

        let userId = dataCustomerGet.userId

        fetch('http://localhost:5000/api/recipient?customerUserId=' + userId, {method: 'GET'})
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();

                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);

                } else {
                    display_info(data)
                }


            })
            .catch(error => {

                if (error === 404) {
                    alert("No recipient with specified userId")
                } else {
                    alert("Error getting recipient of customer: " + error)
                }


            });

        // reset Form
        for (var key in dataCustomerGet) {
            resetField(key);
        }
        reset({});


    }

    function display_info(data: any) {
        data = JSON.stringify(data)
        console.log(data)
        reset({
                customerUserDisplayRecipients: data
            }, {}
        );

    }


    return (


        <div>

            <br/>
            <br/>
            <h2>Get Customer Account's Recipients</h2>
            <p>Enter ID of Customer Account to get the Customer's recipients.
            </p>

            <form onSubmit={handleSubmit(onSubmitCustomerGet)}>
                <input type="text" placeholder="userId" {...register("userId")} required/>
                <br/>
                <br/>
                <textarea readOnly={true} rows={10} cols={100}
                          placeholder="Customer's recipients will be shown here" {...register("customerUserDisplayRecipients")} />
                <br/>
                <br/>
                <input type="submit"/>
            </form>
            <br/>
            <br/>


        </div>
    )


}


export default CustomerRecipientGet;
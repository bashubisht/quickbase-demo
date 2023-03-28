import './App.css';
import { TextInput } from './components/TextInput';
import Choices from './components/Choices';
import { useEffect, useState } from 'react';
import Type from './components/Type';
import Order from './components/Order';
import { CHOICE_ORDER_OPTIONS, DUPLICATE_CHOICES_ERROR, FIELD_TYPES, MAX_CHOICES_ALLOWED, MAX_CHOICES_EXCEEDED_ERROR } from './utils/constants';
import { CheckBox } from './components/CheckBox';
import { Button } from './components/Button';
import { FieldService } from './services/MockService';
import { convertArrayToSet, duplicateValueExists } from './utils/utilMethods';

const App = () => {

  const [label, setLabel] = useState(localStorage.getItem('label') ?  localStorage.getItem('label') : "");
  const [defaultChoiceValue, setdefaultChoiceValue] = useState(localStorage.getItem('defaultChoiceValue') ? localStorage.getItem('defaultChoiceValue') : "");
  const [fieldType, setFieldType] = useState(localStorage.getItem('fieldType') ? localStorage.getItem('fieldType') : FIELD_TYPES.multi);
  const [feildRequired, setFieldRequired] = useState(localStorage.getItem('feildRequired') === 'true' ? true : false);
  const [choiceOrder, setChoiceOrder] = useState(localStorage.getItem('choiceOrder') ? localStorage.getItem('choiceOrder') : CHOICE_ORDER_OPTIONS.alphabetical);
  const [choicesText, setChoicesText]= useState (localStorage.getItem('choicesText') ? localStorage.getItem('choicesText') : "");
  
  const [validationErrors, setValidationErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false)
  

  useEffect(() => {
    localStorage.setItem('label', label);
    localStorage.setItem('defaultChoiceValue', defaultChoiceValue);
    localStorage.setItem('fieldType', fieldType);
    localStorage.setItem('feildRequired', feildRequired);
    localStorage.setItem('choiceOrder', choiceOrder);
    localStorage.setItem('choicesText', choicesText);
  },[label, defaultChoiceValue, fieldType, feildRequired, choiceOrder, choicesText])
  

  const labelChange = (event) =>{
    setLabel(event.target.value)
  }

  const defaultChoiceChange = (event) =>{
    setdefaultChoiceValue(event.target.value)
  }
  
  const handleFieldTypeChange = (type) => {
    setFieldType(type)
  }

  const handleFieldRequiredChange = (event) => {
   setFieldRequired(event.target.checked)
  }

  const handleChoiceOrderChange = (event) => {
    setChoiceOrder(event.target.value)
  }

  const handleChoicesChange = (event) => {
    setChoicesText(event.target.value)
  }

  const handleFormSubmit = () => {  

    setIsLoading(true)

    // splitting choicesText string on the basis of new line character and adding those in an array
    const choicesArray = choicesText.split('\n');

    // Removing trailing spaces from the individual choices
    const trimmedChoicesArray = choicesArray.map((choice) => {
      return choice.trim()
    });

    // removing blank choices
    let nonEmptyChoices = trimmedChoicesArray.filter((choice) => {
      return choice !== ''
    })

    // adding default choice to the nonEmptyChoices array id not present already
    if(!nonEmptyChoices.includes(defaultChoiceValue) && defaultChoiceValue !== '') {
      nonEmptyChoices.push(defaultChoiceValue);
    }

    const updatedChoicesText = nonEmptyChoices.join('\n')
    setChoicesText(updatedChoicesText)

    // validations start here
    let errors = {};

    if(label.trim().length === 0){
      errors = {...errors, requiredLabelError: true}
    }

    const areDuplicateChoicesPresent = duplicateValueExists(nonEmptyChoices)
    if(areDuplicateChoicesPresent) {
      errors = {...errors, duplicateChoicesError: true}
    }

    const choicesSet = convertArrayToSet(nonEmptyChoices)
    if(choicesSet.size > MAX_CHOICES_ALLOWED) {
      errors = {...errors, numOfChoicesExceededError: true}
    }

    setValidationErrors(errors)

    if(Object.keys(errors).length > 0) {
      setIsLoading(false)
      return
    }
    //validations end here


    const requestObject = {
      label: label,
      defaultChoiceValue: defaultChoiceValue,
      fieldType: fieldType,
      feildRequired: feildRequired,
      choiceOrder: choiceOrder,
      choices: nonEmptyChoices
    }

    FieldService.saveField(requestObject)
    
    setTimeout(() => {
      setIsLoading(false)
    },2000 )
    
  }

  const choicesError = []
  if(validationErrors.duplicateChoicesError) {
    choicesError.push(DUPLICATE_CHOICES_ERROR)
  }
  if(validationErrors.numOfChoicesExceededError) {
    choicesError.push(MAX_CHOICES_EXCEEDED_ERROR)
  }

  const handleFormReset = () => {
    setLabel("");
    setdefaultChoiceValue("")
    setFieldType(FIELD_TYPES.multi)
    setFieldRequired(false)
    setChoiceOrder(CHOICE_ORDER_OPTIONS.alphabetical)
    setChoicesText("")
    setValidationErrors({})
    setIsLoading(false)
  }
  
  return (
    <div>
      <div className="formContainer w-3/4">
        <h2 className="headerContainer mt-10 mb-10 text-4xl font-medium">
          Field Builder
        </h2>
          
        <TextInput name="Label" handleChange={labelChange} value={label} error={validationErrors.requiredLabelError}/>      
        <TextInput name="Default Value" handleChange={defaultChoiceChange} value={defaultChoiceValue}/>

        <Choices handleChange = {handleChoicesChange} value={choicesText} errors={choicesError}/>

        <Type handleChange={handleFieldTypeChange} value={fieldType}/>

        <CheckBox handleChange={handleFieldRequiredChange} value={feildRequired} label="A Value is required"/>

        <Order name="Order" handleChange = {handleChoiceOrderChange} value={choiceOrder} option1= {CHOICE_ORDER_OPTIONS.alphabetical} option2= {CHOICE_ORDER_OPTIONS.choiceLength}/>
        
        <div className='md:flex md:flex-row'>
          <div className='w-1/3'></div>
          <Button btnLabel='Save Changes' handleButtonClick={handleFormSubmit} isLoading={isLoading}/>
          <Button btnLabel='Reset' handleButtonClick={handleFormReset}/>
        </div>
      </div>
    </div>
  )  
}

export default App;

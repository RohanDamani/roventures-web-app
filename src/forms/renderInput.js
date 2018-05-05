import React from "react";
import {FormControl} from "react-bootstrap";

const renderInput = field =>
    <div>
            <FormControl {...field.input} className={field.meta.error && field.meta.touched && field.meta.submitFailed && 'warn-input'}
                         autoFocus={field.focus} disabled={field.disabled} maxLength={field.maxLength} placeholder={field.placeholder} />
            {field.meta.error && field.meta.touched && field.meta.submitFailed && <span className={'warn-text'}>{field.meta.error}</span>}
    </div>

export default renderInput

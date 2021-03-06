import React, { useEffect, useCallback, useState, useRef } from 'react';
import useStyles from './styles';
import { useSelector } from 'react-redux';
import { selectContactLang } from '../../../redux/selectors';
import useForm, { IFormSchema } from '../../../react-hooks/useForm';
import { sendEmail, verifyCaptcha } from '../../../services';
import formTemplate from './template';
import { STATUS } from '../../../utils/contants';
// Components
import Title from '../../Typography/Title';
import Paragraph from '../../Typography/Paragraph';
import Content from '../Partials/Content/Content';
import InputText from '../../Inputs/InputText';
import InputTextArea from '../../Inputs/InputTextArea';
import Button from '../../Inputs/Button';
import StatusPopup from './StatusPopup';
import ErrorsAlert from './ErrorsAlert';

function Contact() {
  const lang = useSelector(selectContactLang);
  const [status, setStatus] = useState(STATUS.IDLE);
  const [openErrorAlerts, setOpenErrorAlerts] = useState(false);
  const [statusErrorMessage, setStatusErrorMessage] = useState(lang.unhandledErrorMessage);
  const [reactToErros, setReactToErrors] = useState(false);
  const ref = React.createRef<HTMLFormElement>();
  const classes = useStyles();
  const {
    title,
  } = lang;
  const [values, errors, onChange, validate] = useForm(formTemplate as IFormSchema);
  const { name, email, message } = values;

  useEffect(() => {
    document.title = `Daniel Sosa | ${title}`;
  }, []);

  useEffect(() => {
    if (reactToErros) {
      // Set focus on first form input with error
      const current = ref.current;
      if (current) {
        const formInputWithError = Array.from((current as HTMLElement).children)
          .map((el: HTMLElement) => el.children[1])
          .find((el: HTMLInputElement) => {
            if (el) {
              return Boolean(errors[(el as HTMLInputElement).name]);
            }
            return false;
          });
        if (formInputWithError) {
          setOpenErrorAlerts(true);
          setTimeout(() => {
            (formInputWithError as HTMLElement).focus();
          }, 0);
        }
        setReactToErrors(false);
      }
    }
  }, [errors, ref.current]);

  const handleChange = useCallback((evt: React.ChangeEvent<HTMLInputElement>): void => {
    setOpenErrorAlerts(false);
    onChange(evt);
  }, [onChange]);

  const handleSubmit = useCallback(evt => {
    evt.preventDefault();
    const { valid } = validate();
    if (valid) {
      setStatus(STATUS.WORKING);
      verifyCaptcha()
        .then(rcToken => sendEmail(name as string, email as string, message as string, rcToken as string))
        .then(() => {
          // Delay to allow screen readers to catch up
          setTimeout(() => setStatus(STATUS.SUCCESS), 1000);
        })
        .catch(error => {
          if (error.message === 'Bad Request') {
            setStatusErrorMessage(lang.badRequestErrorMessage);
          }
          else {
            setStatusErrorMessage(lang.unhandledErrorMessage);
          }
          setStatus(STATUS.ERROR);
        });
    }
    else {
      setReactToErrors(true);
    }
  }, [validate]);

  return (
    <section className={classes.section}>
      <Content component="article" aria-label={title} id="contact-form" style={{ minHeight: window.innerHeight }}>
        <img src="assets/img/contact-form/undraw_contact_us_15o2.svg" alt={lang.contactIllustrationAlt} className={classes.banner} />
        <Title tabIndex={0}>{title}</Title>
        <Paragraph>{lang.formInstructions}</Paragraph>
        <ErrorsAlert open={openErrorAlerts} errors={errors} />
        <form
          className={classes.form}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
          ref={ref}
        >
          <InputText
            id="input-name"
            label={lang.name}
            value={name as string || ''}
            name="name"
            onChange={handleChange}
            error={errors.name}
            autoComplete="off"
            leftPadding={72}
            required
            fullWidth
            autoFocus
          />
          <InputText
            id="input-email"
            label={lang.email}
            value={(email as string) || ''}
            name="email"
            onChange={handleChange}
            error={errors.email}
            autoComplete="off"
            leftPadding={72}
            required
            fullWidth
          />
          <InputTextArea
            id="input-message"
            label={lang.message}
            value={(message as string) || ''}
            name="message"
            onChange={handleChange}
            error={errors.message}
            rows={3}
            leftPadding={72}
            required
            fullWidth
          />
          <Button type="submit" onClick={handleSubmit} fullWidth>
            {lang.send}
          </Button>
        </form>
        <StatusPopup
          status={status}
          errorMessage={statusErrorMessage}
          lang={lang}
        />
      </Content>
    </section>
  );
}

export default Contact;

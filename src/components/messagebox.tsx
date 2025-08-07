import styles from "./messagebox.module.css";

interface message_box_props {
  is_open: boolean;
  on_close: () => void;
  close_button_txt: string;
  title: string;
  text: string;
}

export function MessageBox(props: message_box_props) {
  if (!props.is_open) {
    return;
  }

  return (
    <div className={styles.modal_overlay}>
      <div className={styles.modal_content}>
        <h2>{props.title}</h2>
        <p>{props.text}</p>
        <button className={styles.close_button} onClick={props.on_close}>
          {props.close_button_txt}
        </button>
      </div>
    </div>
  );
}

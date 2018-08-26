package test.MyException;

public class MyFirstException extends Exception {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public MyFirstException() {
		super();
	}

	public MyFirstException(String msg) {
		super(msg);
	}

	public MyFirstException(String msg, Throwable cause) {
		super(msg, cause);
	}

	public MyFirstException(Throwable cause) {
		super(cause);
	}
}
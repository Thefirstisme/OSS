package test.MyException;

public class TestMyException {
	public static void firstException() throws MyFirstException {
		throw new MyFirstException(
				"\"firstException()\" method occurs an exception!");
	}

	public static void secondException() throws MySecondException {
		throw new MySecondException(
				"\"secondException()\" method occurs an exception!");
	}

	public static void main(String[] args) {
		MySecondException m= new MySecondException();
		StackTraceElement[] trace = m.getStackTrace();
		
		for (int i=0; i < trace.length; i++)
            System.out.println("\tat " + trace[i]);
//		try {
//			TestMyException.firstException();
//			TestMyException.secondException();
//			m.printStackTrace();
//		} catch (MyFirstException e1) {
//			System.out.println("Exception: " + e1.getMessage());
//			e1.printStackTrace();
//		} catch (MySecondException e2) {
//			System.out.println("Exception: " + e2.getMessage());
//			e2.printStackTrace();
//		}
	}
}

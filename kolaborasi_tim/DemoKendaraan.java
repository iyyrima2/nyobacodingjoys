class Kendaraan{
	public void jalan(){
		System.out.println("Kendaraan berjalan...");
	}
}

class Mobil extends Kendaraan{
	@Override
	public void jalan(){
		System.out.println("Mobil berjalan di jalan raya!");
	}

}

class Motor extends Kendaraan{
	@Override 
	public void jalan(){
		System.out.println("Motor berjalan di lapangan kosong!");
	}
}

public class DemoKendaraan{
	public static void main(String[] args){
		Kendaraan k1 = new Kendaraan();
		Mobil m2 = new Mobil();
		Motor motor3 = new Motor();

		k1.jalan();
		m2.jalan();
		motor3.jalan();
	}
}